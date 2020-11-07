const Api = require('./api');
const Errcode = require('../consts/errcode');
const Utils = require('../consts/utils');

module.exports = class extends Api {
  async indexAction() {
    let prefix = this.config('model').mysql.prefix;
    if (this.ctx.method === 'GET') {
      let cid = this.get('id');
      // 获取当前 course
      let count = await this.model('course').where({pid: cid}).count('id');
      if (count) {
        // preview
        let preview = await this.model('course').getAccess(this.ctx.user.id, cid, prefix);
        if (!think.isEmpty(preview) && (preview.preview || preview.access)) {
          return this.ctx.state.data.data = await this.model('course').getList(this.ctx.user.id, cid, prefix);
        }
      } else {
        let preview = await this.model('course').getAccess(this.ctx.user.id, cid, prefix);
        if (!think.isEmpty(preview) && (preview.preview || preview.access)) {
          return this.ctx.state.data.data = [preview];
        }
      }
      this.ctx.state.data = Errcode.ACCESS_DENIED;
    } else if (this.ctx.method === 'POST') {
      let cid = this.get('id');
      let preview = await this.model('course').getAccess(this.ctx.user.id, cid, prefix);
      if (!think.isEmpty(preview) && (preview.preview || preview.access)) {
        let res = this.model('course_user_process').add({
          user_id: this.ctx.user.id,
          course_id: cid,
          createtime: Utils.timestamp(true),
        });
        if (!think.isEmpty(res)) {
          return this.ctx.state.data;
        }
      }
      this.ctx.state.data = Errcode.ACCESS_DENIED;
    } else if (this.ctx.method === 'PUT') {
      // pay
      let cid = this.get('id');
      let model = this.model('course');
      let user_id = this.ctx.user.id;
      await model.transaction(async () => {
        try {
          //通过 db 方法将 user 模型的数据库连接传递给 article 模型
          let userModel = this.model('user').db(model.db());
          let courseUserModel = this.model('course_user').db(model.db());
          let moneyLogModel = this.model('user_money_log').db(model.db());
          let course = await model.where({id: cid}).lock(true).find();
          if (think.isEmpty(course)) {
            return this.ctx.state.data = Errcode.NOT_EXIST;
          }
          let user = await userModel.where({id: this.ctx.user.id}).lock(true).find();
          if (user.money >= course.price) {
            let log_id = await moneyLogModel.add({
              user_id: this.ctx.user.id,
              money: course.price / 100,
              before: user.money / 100,
              after: (user.money - course.price) / 100,
              memo: '购买课程 [' + course.title + `] [${course.id}]`,
              createtime: Utils.timestamp(true)
            });
            console.log('insertId', log_id);
            await userModel.where({id: this.ctx.user.id}).update({
              money: user.money - course.price,
              updatetime: Utils.timestamp(true)
            });

            let courses = [];
            let ids = await model.query(`select queryChilds(${cid})`);
            ids = Object.values(ids[0])[0].split(',');
            ids.forEach(v => {
              let obj = {user_id, log_id, createtime: Utils.timestamp(true)}
              if (v !== '$') {
                obj.course_id = v;
                courses.push(obj);
              }
            })
            await courseUserModel.addMany(courses);
          } else {
            this.ctx.state.data = Errcode.NOT_ENOUGH_MONEY;
          }
        } catch (e) {
          think.logger.error(`[course method put][cid=${cid}][user_id=${user_id}][${e.toString()}]`)
          this.ctx.state.data = Errcode.FAIL;
        }
      })
    }
  }
}
