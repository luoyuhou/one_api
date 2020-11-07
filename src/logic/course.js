module.exports = class extends think.Logic {
  __before() {
    this.allowMethods = 'get,post,put';
  }

  indexAction() {
    let rules = {
      id: {
        int: true,
        trim: true,
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
