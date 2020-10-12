module.exports = class extends think.Logic {
  __before() {
    this.allowMethods = 'post'; //只允许 POST 请求
    this.allowMethods = 'get,post'; // 允许 get、post请求类型
  }

  indexAction() {
    // let rules = {
    //   username: {
    //     string: true,
    //     required: true,
    //     default: 'xxx',
    //     trim: true,
    //     method: 'GET', //指定获取数据的方式
    //   },
    //   age: {
    //     min: 20,
    //     max: 60
    //   }
    // }
    // console.log('---------')
    // let flag = this.validate(rules);
    // if (!flag) {
    //   return this.fail('validate error', this.validateErrors);
    // }
    this.rules = {
      username: {
        string: true,
        required: true,
        default: 'xxx',
        trim: true,
        method: 'GET', //指定获取数据的方式
      },
      age: {
        int: true,
        min: 20,
        max: 60
      }
    }
  }

  __after() {

  }
};
