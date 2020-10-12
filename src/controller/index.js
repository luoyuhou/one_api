const Api = require('./api');

module.exports = class extends Api {
  indexAction() {
    console.log('index controller', this.ctx.state.data);
  }
}
