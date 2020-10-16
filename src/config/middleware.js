const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      extendTypes:{
        json: ['application/x-javascript'], // will parse application/x-javascript type body in the same way as JSON type
        form: ['application/thinkjs-form'], // will parse application/thinkjs-form type body in the same way as form type
        text: ['application/thinkjs-text'], // will parse application/thinkjs-text type body in the same way as text type
        multipart: ['application/thinkjs-multipart'], // will parse application/thinkjs-multipart type body in the same way as multipart-form type
        xml: ['application/thinkjs-xml'], // will parse application/thinkjs-xml type body in the same way as xml type
      },
      limit: '5mb',
      uploadDir: path.join(path.join(path.join(think.ROOT_PATH, 'www'), 'static'), 'upload'),
      hash: 'sha1'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
