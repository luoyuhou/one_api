const Api = require('./api');
const User = require('../consts/constand').LOGIN_USER;
const Utils = require('../consts/utils');
const Errcode = require('../consts/errcode');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
// const write = think.promisify(fs.writeFile, fs);

module.exports = class extends Api {
  async indexAction() {
    let lang = this.post('lang');
    let version = this.post('version');
    let code = this.post('code');

    let filepath = think.ROOT_PATH;
    let arr = ['runtime', 'coding', this.ctx.user.id.toString()];
    arr.forEach(v => {
        filepath = path.join(filepath, v);
        console.log('before')
        if(!fs.existsSync(filepath)) {
            console.log('start')

            fs.mkdirSync(filepath, 777)
        }
    });

    filepath = path.join(filepath, 'index.py');
    let self = this;
    // await write(filepath, unescape(code), 'utf-8');
    console.log('filepath = ', filepath);
    console.log('code', code, '|unescape ', unescape(code))
    fs.writeFile(filepath, unescape(code), 'utf8', function(err) {
        console.log('wirte', err);
        if (err) {
          return self.ctx.state.data = Errcode.FAIL;
      }

    console.log(1111);
    new Promise(
        function(resolve, reject) {
            child_process.exec(`python ${filepath}`, function(error, stdout, stderr){
                console.log(2222);
                console.log(`[error=${error}][stdout=${stdout}][stderr=${stderr}]`);
                if (error) {
                    return self.ctx.state.data = Errcode.FAIL;
                }
                self.ctx.state.data = Errcode.SUCCESS;
                self.ctx.state.data.data = stdout;
                console.log('end', JSON.stringify(self.ctx.state.data))
                resolve()
            })
        }).then(res => {
            console.log('res', res);
        })
    });
    console.log(3333);
  }
}
