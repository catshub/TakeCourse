const host = '202.115.47.141';
const port = 80;
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
const api = {
  CrossOrigin: 'http://draven-system.xhuyq.me',
  // CrossOrigin: 'http://localhost:8080',
  LoginAction: {
    host,
    port,
    method: 'post',
    path: '/loginAction.do',
    headers,
  },
  XkAction: {
    host,
    port,
    method: 'post',
    path: '/xkAction.do',
    headers,
  },
  sTop: {
    host,
    port,
    path: '/menu/s_top.jsp',
    method: 'GET',
    headers,
  },
  GetOnce: {
    host,
    port,
    path: '/xkAction.do?actionType=-1',
    method: 'GET',
    headers,
  }
};
module.exports = api;
