const Api = require('./api');

module.exports = class extends Api {
  async indexAction() {
    let type = await this.model('course_type').field('id,name').select();
    let res = await this.model('course').where('status="normal"').field('id,title,url,public,type,createtime').select();
    res.forEach(v => {
      let arr = [];
      let vType = v.type.split(',').map(v => { return parseInt(v); });
      type.forEach(item => {
        if (vType.includes(item.id)) {
          arr.push(item.name)
        }
      });
      v.type = arr;
    })
    this.ctx.state.data.data = res;
  }
}
