const host = '202.115.47.141';
const port = 80;
const api = {
  LoginAction: {
    host,
    port,
    method: 'post',
    path: '/loginAction.do',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
  XkAction: {
    host,
    port,
    method: 'post',
    path: '/xkAction.do',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
  sTop: {
    host,
    port,
    path: '/menu/s_top.jsp',
    method: 'GET',
  },
};
module.exports = api;
