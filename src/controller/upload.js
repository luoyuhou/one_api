const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);

module.exports = class extends Base {
  __before() {
    super.__before();
    this.ctx.state.data = {errno: 1, errmsg: 'upload failed', data: ''}
  }

  async indexAction() {
    if (this.isMethod('POST')) {
      let upload = this.ctx.request.body['file']['file'];
      let filepath = '';
      try {
        let file = await this.model('upload').where({hash: upload.hash}).field('name').find();
        if (file && file.name) {
          this.ctx.state.data = { errno: 0, errmsg: 'upload success', data: file.name }
        } else {
          let datetime = think.datetime(new Date().getTime(), 'YYYYMMDD');
          let name = think.md5((new Date()).getTime() + Math.random()) + '.' + upload.name.split('.')[1];
          filepath = think.ROOT_PATH;
          ['www', 'static', 'upload', datetime, name].forEach(v => {
            filepath = path.join(filepath, v)
          });
          think.mkdir(path.dirname(filepath));
          await rename(upload.path, filepath);
          let filename = '/static/upload/' + datetime + '/' + name;
          let res = await this.model('upload').add({
            name: filename,
            size: upload.size,
            ip: this.ctx.ip.split('ffff:')[1],
            agent: this.ctx.userAgent,
            type: upload.type,
            hash: upload.hash,
            createtime: Date.parse(new Date()) / 1000
          })
          if (think.isEmpty(res)) {
            if (fs.existsSync(filepath)) {
              fs.unlinkSync(filepath);
            }
          } else {
            this.ctx.state.data = { errno: 0, errmsg: 'upload success', data: filename }
          }
        }
      }catch (e) {
        if (filepath && fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        this.ctx.state.data.data = e;
      }
    }
  }
};
