module.exports = class extends think.Logic {
  __before() {
    this.allowMethods = 'post'; //只允许 POST 请求
    // this.allowMethods = 'get,post'; // 允许 get、post请求类型
  }

  registerAction() {
    let rules = {
      username: {
        string: true,
        required: true,
        trim: true,
        method: 'POST',
        length: {min: 4, max: 20}
      },
      password: {
        string: true,
        required: true,
        method: 'POST',
        length: {min: 6, max: 20},
      },
      confirm_password: {
        string: true,
        required: true,
        method: 'POST',
        length: {min: 6, max: 20},
        equals: 'password'
      },
      email: {
        email: true
      },
      mobile: {
        mobile: 'zh-CN' //必须为中国的手机号
      }
    }

    let flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }

  loginAction() {
    let rules = {
      username: {
        string: true,
        required: true,
        trim: true,
        method: 'POST',
        length: {min: 4, max: 20}
      },
      password: {
        string: true,
        required: true,
        trim: true,
        method: 'POST',
        length: {min: 6, max: 20}
      }
    }

    let flag = this.validate(rules);
    // console.log('----', flag, this.validateErrors)
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }

  __after() {

  }
};
