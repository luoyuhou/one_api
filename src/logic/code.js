module.exports = class extends think.Logic {
  __before() {
    this.allowMethods = 'post'; //只允许 POST 请求
  }

  indexAction() {
    let rules = {
      code: {
        string: true,
        required: true,
      },
      lang: {
        string: true
      },
      version: {
        int: true
      }
    }
    let flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }

  __after() {

  }
};
