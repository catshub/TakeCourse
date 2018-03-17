const host = '202.115.47.141';
const api = {
  LoginAction: {
    host,
    port: 80,
    path: '/loginAction.do',
    method: 'post',
    url: '/loginAction.do',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
};
module.exports = api;
