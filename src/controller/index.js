const Api = require('./api');
const Errcode = require('../consts/errcode');

module.exports = class extends Api {
  async indexAction() {
    let type = await this.model('course_type').field('id,name').select();
    let res = await this.model('course').where('status="normal"').field('id,title,url,public,type,price,createtime').select();
    res.forEach(v => {
      v.price = v.price ? (v.price / 100).toFixed(2): '0.00';
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
