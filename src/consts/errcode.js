module.exports = {
  SUCCESS: {errno: 0, errmsg: 'success', data: ''},
  FAIL: {errno: 2000, errmsg: 'operate fail', data: ''},
  NOT_LOGIN: {errno: 2001, errmsg: 'not login', data: ''},
  NOT_EXIST: {errno: 2002, errmsg: 'not exist', data: ''},
  USER_EXIST: {errno: 2003, errmsg: 'user exist', data: ''},
  WRONG_PASSWORD: {errno: 2004, errmsg: 'wrong password', data: ''},
  ACCESS_DENIED: {errno: 2005, errmsg: 'access denied', data: ''},
  NOT_ENOUGH_MONEY: {errno: 2006, errmsg: 'Don\'t have enough money', data: ''},
}
