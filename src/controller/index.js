const Api = require('./api');

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

  async listAction() {
    let id = this.get('id');
    console.log('id', id);
    let res = await this.model('course_list').where({pid: 0, course_id: id}).field('id,title,sort,preview,url,createtime').select();
    if (!think.isEmpty(res)) {
      this.ctx.state.data.data = res;
    }
  }
}
