const host = 'http://202.115.47.141';
const api = {
  LoginAction: {
    baseURL: host,
    method: 'post',
    url: '/loginAction.do',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
  XkAction: {
    baseURL: host,
    method: 'post',
    url: '/xkAction.do',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
};
module.exports = api;
