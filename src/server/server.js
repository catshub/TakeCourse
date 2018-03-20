const Http = require('http');
const Api = require('./api');
const iconv = require('iconv-lite');
const QueryString = require('querystring');

// 请求教务处登录
function loginAction(userData, option, res) {
  // option = Api.LoginAction;
  const realReq = Http.request(option, response => {
    let data = '';
    response.on('data', d => {
      data += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      console.log(response);
      if (data.includes('学分制综合教务')) {
        const cookie = response.headers['set-cookie'][0].split(';')[0];
        res.writeHead(200, { 'Access-Control-Allow-Origin': 'http://localhost:8080', 'Access-Control-Allow-Credentials': true });
        res.end(cookie);
      } else res.end('失败');
    });
  });
  realReq.end(userData);
}
// 搜索课程
function skAction(userData, option, Cookie, res) {
  const query = QueryString.stringify(typeof userData === 'object' ? userData : JSON.parse(userData));
  const realReq = Http.request(option, response => {
    let data = '';
    response.on('data', d => {
      data += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      console.log(response);
      res.writeHead(200, { 'Access-Control-Allow-Origin': 'http://localhost:8080', 'Access-Control-Allow-Credentials': true });
      if (data.includes('学分制综合教务')) {
        res.end(data);
      } else res.end(data);
    });
  });
  realReq.setHeader('Cookie', Cookie);
  realReq.end(query);
}
// 选课
function XkAction(userData, option, Cookie, res) {
  const query = QueryString.stringify(typeof userData === 'object' ? userData : JSON.parse(userData));
  const realReq = Http.request(option, response => {
    let data = '';
    response.on('data', d => {
      data += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      console.log(response);
      res.writeHead(200, { 'Access-Control-Allow-Origin': 'http://localhost:8080', 'Access-Control-Allow-Credentials': true });
      if (data.includes('学分制综合教务')) {
        res.end(data);
      } else res.end(data);
    });
  });
  realReq.writeHead('Cookie', Cookie);
  realReq.end(query);
}

Http.createServer((req, res) => {
  // const user = url.parse(req.url).query;
  let data = '';
  switch (req.url) {
    case '/loginAction':
      req.on('data', d => {
        data += d;
      });
      req.on('end', () => loginAction(data, Api.LoginAction, res));
      break;
    case '/skAction':
      req.on('data', d => {
        data += d;
      });
      req.on('end', () => skAction(data, Api.XkAction, req.headers.cookie, res));
      break;
    case '/xkAction':
      req.on('data', d => {
        data += d;
      });
      req.on('end', () => XkAction(data, Api.XkAction, req.headers.cookie, res));
      break;
    default:
      res.end('none');
      break;
  }
}).listen(8101);
console.log('server ing');
