const Api = require('./api');
const fs = require('fs');
const path = require('path');
// const rename = think.promisify(fs.rename, fs); //通过 promisify 方法把 rename 方法包装成 Promise 接口


module.exports = class extends Api {
  async uploadAction() {
    let file = this.ctx.file('file');
    let filepath = think.ROOT_PATH;
    let paths = ['www', 'static', 'upload'];
    paths.push(think.datetime(new Date().getTime(), 'YYYYMMDD'));
    paths.push(file.name);
    paths.forEach(v => {
      filepath = path.join(filepath, v);
    });

    // console.log('name', file);
    /**
     * size = 1562
     * path = 'C:\\Users\\Administrator\\AppData\\Local\\Temp\\upload_c2f1a32e7863c4f4f9cc4937c2385b44.jpg',
     * name = 'avatar.jpg'
     * type = 'image/jpeg'
     */

      // think.mkdir(path.dirname(filepath))
      // await rename(file.path, filepath);

    console.log('filepath', filepath);
    var readStream = fs.createReadStream(file.path);
    var writeStream = fs.createWriteStream(filepath);
    readStream.pipe(writeStream);
    readStream.on('end',function(){
      if (fs.exists(filepath)) {
        fs.unlinkSync(file.path);
      }
    })
    this.ctx.state.data.data = {path: filepath.split('www')[1]}
  }

  downloadAction() {

  }
}
