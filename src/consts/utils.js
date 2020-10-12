class Utils {
  /**
   * 获取随机字符串
   * @param size 字符串长度
   * @param type d = 数字字符串，w = 英文字符串，默认为混合字符串
   * @returns {string}
   */
  static randomCode(size= 6, type= '') {
    let number_code_set = 1234567890;
    let word_code_set = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code_set = '2345678abcdefhijkmnpqrstuvwxyzABCDEFGHJKLMNPQRTUVWXY';
    let str = '';
    let t = type.toLowerCase();
    let set = t === 'd' ? number_code_set : (t === 'w' ? word_code_set : code_set);
    for (let i = 0; i < size; i++) {
      let index = Math.floor(Math.random() * set.length)
      str += set[index];
    }
    return str;
  }

  /**
   * 获取时间戳
   * @param type 默认获取毫秒时间戳，有值的时候为秒单位时间戳
   * @returns {undefined|number}
   */
  static timestamp(type = null) {
    let time = new Date().getTime();
    return type ? parseInt(time / 1000): time;
  }
}

module.exports = Utils;
