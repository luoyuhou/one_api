const Api = require('./api');
const Errcode = require('../consts/errcode');

module.exports = class extends Api {
  async indexAction() {
    if (this.ctx.method === 'GET') {
      let id = this.get('id');
      let course = this.model('course_user').where({user_id: this.user.id, id: id}).find();
      if (think.isEmpty(course)) {
        return this.ctx.state.data = Errcode.FAIL;
      }
      let list = this.model('course').where()
    } else if (this.ctx.method === 'POST') {

    }
  }
}
