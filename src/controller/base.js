const Data = require('../consts/errcode').SUCCESS;

module.exports = class extends think.Controller {
  __before() {
    this.ctx.state.data = Data;
  }

  __after() {
    return this.json(this.ctx.state.data);
  }
};
