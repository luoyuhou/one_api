const Api = require('./api');
const User = require('../consts/constand').LOGIN_USER;
const Utils = require('../consts/utils');
const Errcode = require('../consts/errcode');
const path = require('path');
const fs = require('fs');
const exe = require('child_process').spawnSync;

module.exports = class extends Api {
  async indexAction() {
    let lang = this.post('lang');
    let version = this.post('version');
    let code = this.post('code');

    let filepath = think.ROOT_PATH;
    let arr = ['runtime', 'coding', this.ctx.user.id.toString()];
    arr.forEach(v => {
        filepath = path.join(filepath, v);
        if(!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, 777)
        }
    });

    filepath = path.join(filepath, 'index.py');
    let self = this;
    fs.writeFileSync(filepath, unescape(code), 'utf8');
    let res = exe('python', [filepath]);
    let stdout = res.stdout.toString();
    if (stdout) {
      self.ctx.state.data.data = stdout;
    } else {
      let data = Errcode.FAIL;
      data.data = res.stderr.toString().split(',')[2];
      self.ctx.state.data = data;
    }
  }
}
