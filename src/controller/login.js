const Base = require('./base');
const User = require('../consts/constand').LOGIN_USER;
const Errcode = require('../consts/errcode');
const Utils = require('../consts/utils');

module.exports = class extends Base {
  /**
   * 登录
   * @returns {Promise<void>}
   */
  async loginAction() {
    let username = this.post('username');
    let password = this.post('password');

    let user = await this.model('user').where({username: username}).find();
      if (think.isEmpty(user)) {
        this.ctx.state.data = Errcode.NOT_EXIST;
      } else {
        if (think.md5(password + user.salt) === user.password) {
          let time = Utils.timestamp(1);
          let successions = user.successions,
              maxsuccessions = user.maxsuccessions;
          let day1 = think.datetime(time * 1000, 'YYYY-MM-DD');
          let day2 = think.datetime(user.logintime * 1000, 'YYYY-MM-DD');
          day1 = (new Date(day1)).getTime();
          day2 = (new Date(day2)).getTime();
          if (day1 - day2 === 86400000) {
            successions++;
            if (successions > maxsuccessions) {
              maxsuccessions++;
            }
          } if (day1 - day2 > 86400000) {
            // 登录间隔时间超过1天
            successions = 1;
          }
          try {
            await this.model('user').where({id: user.id}).update({
              loginip: this.ctx.ip.split('ffff:')[1],
              updatetime: time,
              logintime: time,
              prevtime: user.updatetime,
              successions: successions,
              maxsuccessions: maxsuccessions
            });
            await this.session(User, user);
          }catch (e) {
            console.log(e);
            this.ctx.state.data = Errcode.FAIL;
          }
        } else {
          this.ctx.state.data = Errcode.WRONG_PASSWORD;
        }
      }
  }

  /**
   * 注册
   * @returns {Promise<{errno: number, data: {}, errmsg: string}>}
   */
  async registerAction() {
    let username = this.post('username');
    let password = this.post('password');
    let salt = Utils.randomCode();
    let email = this.post('email');
    let mobile = this.post('mobile');
    let time = Utils.timestamp(1);
    let res = await this.model('user').where(`username='${username}' or email='${email}' or mobile='${mobile}'`).find();

    if (!think.isEmpty(res)) {
      return this.ctx.state.data = Errcode.USER_EXIST;
    }

    try {
      await this.model('user').add({
        username: username,
        nickname: username,
        password: think.md5(password + salt),
        salt: salt,
        email: email,
        mobile: mobile,
        joinip: this.ctx.ip.split('ffff:')[1],
        createtime: time,
        jointime: time,
        status: 'normal'
      });
      // result = 3, 返回为插入数据的 id
    } catch (e) {
      console.log(e);
      this.ctx.state.data = Errcode.FAIL;
    }
  }

  /**
   * 注销
   * @returns {Promise<void>}
   */
  async logoutAction() {
    await this.session(null);
  }
}
