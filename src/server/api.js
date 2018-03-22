const Http = require('http');

const host = '202.115.47.141';
const port = 80;
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
const agent = new Http.Agent({ keepAlive: true });
const api = {
  CrossOrigin: 'http://draven-system.xhuyq.me',
  LoginAction: {
    host,
    port,
    method: 'post',
    path: '/loginAction.do',
    agent,
    headers,
  },
  XkAction: {
    host,
    port,
    method: 'post',
    path: '/xkAction.do',
    agent,
    headers,
  },
  sTop: {
    host,
    port,
    path: '/menu/s_top.jsp',
    method: 'GET',
    headers,
    agent
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
