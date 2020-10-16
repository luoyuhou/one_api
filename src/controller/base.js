const Data = require('../consts/errcode').SUCCESS;

module.exports = class extends think.Controller {
  __before() {
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with");
    this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    this.header('Access-Control-Allow-Credentials',true);
    if(this.ctx.method.toLowerCase() === "options"){
      return this.end();
    }
    this.ctx.state.data = Data;
  }

  __after() {
    return this.json(this.ctx.state.data);
  }
};
