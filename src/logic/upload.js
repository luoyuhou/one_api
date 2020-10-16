module.exports = class extends think.Logic {
  __before() {
    this.allowMethods = 'post'; //只允许 POST 请求
  }

  indexAction() {

  }

  __after() {

  }
};
