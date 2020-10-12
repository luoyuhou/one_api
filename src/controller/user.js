const Api = require('./api');
const User = require('../consts/constand').LOGIN_USER;
const Utils = require('../consts/utils');
const Errcode = require('../consts/errcode');

module.exports = class extends Api {
  async indexAction() {
    let password = this.post('password');
    let data = {};
    let keys = ['email', 'mobile', 'birthday', 'bio', 'avatar', 'gender', 'nickname'];
    let user = await this.session(User);
    keys.forEach(k => {
      if (this.post(k)) {
        data[k] = this.post(k);
      }
    });

    if (password && think.md5(password + user.salt) !== user.password) {
      let salt = Utils.randomCode();
      password = think.md5(password + salt);
      data.salt = salt;
      data.password = password;
    }
    if (Object.keys(data).length) {
      if (think.isEmpty(user)) {
        this.ctx.state.data = Errcode.NOT_LOGIN;
      } else {
        try {
          let res = await this.model('user').where({id: user.id}).update(data);
          if (!res) {
            this.ctx.state.data = Errcode.FAIL;
          }
        }catch (e) {
          console.log('e', e);
          this.ctx.state.data = Errcode.FAIL;
        }
      }
    }
  }
}
