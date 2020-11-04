const Base = require('./base');
const User = require('../consts/constand').LOGIN_USER;
const Errcode = require('../consts/errcode');

module.exports = class extends Base {
  async __before() {
    super.__before();
    let user = await this.session(User);
    if (think.isEmpty(user)) {
      // return this.json(Errcode.NOT_LOGIN);
    }
    this.ctx.user = user;
  }
}
