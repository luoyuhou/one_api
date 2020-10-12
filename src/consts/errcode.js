module.exports = {
  SUCCESS: {errno: 0, errmsg: 'success', data: {}},
  FAIL: {errno: 1000, errmsg: 'operate fail', data: {}},
  NOT_LOGIN: {errno: 1001, errmsg: 'not login', data: {}},
  NOT_EXIST: {errno: 1002, errmsg: 'not exist', data: {}},
  USER_EXIST: {errno: 1003, errmsg: 'user exist', data: {}},
  WRONG_PASSWORD: {errno: 1004, errmsg: 'wrong password', data: {}}
}
