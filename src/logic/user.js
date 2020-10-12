module.exports = class extends think.Logic {
  __before() {
    this.allowMethods = 'put'; //只允许 POST 请求
  }

  indexAction() {
    let rules = {
      nickname: {
        string: true,
        trim: true,
      },
      email: {
        email: true
      },
      mobile: {
        mobile: 'zh-CN' //必须为中国的手机号
      },
      birthday: {
        date: true
      },
      bio: {
        string: true,
        trim: true
      },
      avatar: {
        url: true
      },
      gender: {
        int: {min: 0, max: 1}
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
