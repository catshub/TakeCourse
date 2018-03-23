const Http = require('http');
const Api = require('./api');
const iconv = require('iconv-lite');
const QueryString = require('querystring');
// const cheerio = require('cheerio');

// getName
function getName(Cookie) {
  return new Promise(resolve => {
    const realReq = Http.request(Api.sTop, response => {
      let data = '';
      response.on('data', d => {
        data += iconv.decode(d, 'gbk');
      });
      response.on('end', () => {
        const reg = /欢迎光临&nbsp;(\S+)&nbsp;\|/g;
        const name = reg.exec(data)[1];
        resolve(name);
      });
    });
    realReq.setHeader('Cookie', Cookie);
    realReq.setSocketKeepAlive(true);
    realReq.end();
  });
}
function loginAction(userData, option, res) {
  // option = Api.LoginAction;
  const realReq = Http.request(option, response => {
    let data = '';
    response.on('data', d => {
      data += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      // console.log(response);
      if (data.includes('学分制综合教务')) {
        const cookie = response.headers['set-cookie'][0].split(';')[0];
        getName(cookie).then(name => {
          res.setHeader('Set-Cookie', cookie);
          res.writeHead(200, {
            'Access-Control-Allow-Origin': Api.CrossOrigin,
            'Access-Control-Allow-Credentials': true,
          });
          const temp = JSON.stringify({ cookie, name });
          console.log(cookie);
          res.end(temp);
        });
      } else {
        res.writeHead(200, {
          'Access-Control-Allow-Origin': Api.CrossOrigin,
          'Access-Control-Allow-Credentials': true,
        });
        res.end('登录失败');
      }
    });
  });
  realReq.setSocketKeepAlive(true);
  realReq.setHeader('Content-Length', Buffer.byteLength(userData));
  realReq.end(userData);
}
// getCookie
function getCookie(userData, option) {
  return new Promise(resolve => {
    const realReq = Http.request(option, response => {
      let data = '';
      response.on('data', d => {
        data += iconv.decode(d, 'gbk');
      });
      response.on('end', () => {
        if (data.includes('学分制综合教务')) {
          const cookie = response.headers['set-cookie'][0].split(';')[0];
          resolve(cookie);
        } else resolve(0);
      });
    });
    realReq.setSocketKeepAlive(true);
    // realReq.setHeader('Content-Length', Buffer.byteLength(userData));
    console.log(QueryString.stringify(userData));
    realReq.end(QueryString.stringify(userData));
  });
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
      res.writeHead(200, { 'Access-Control-Allow-Origin': Api.CrossOrigin, 'Access-Control-Allow-Credentials': true });
      if (data.includes('学分制综合教务')) {
        res.end(data);
      } else res.end(data);
    });
  });
  realReq.setHeader('Cookie', Cookie);
  realReq.setHeader('Content-Length', Buffer.byteLength(query));
  realReq.end(query);
}
// 云抢课
function takeCourse(query, Cookie, option, resolve, i) {
  const cloudReq = Http.request(option, response => {
    let data = '';
    response.on('data', d => {
      data += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      if (!/(没有课余量)/.test(data)) {
        resolve(data);
      } else {
        setTimeout(() => takeCourse(query, Cookie, option, resolve, i), 500);
        console.log(`抢课中... ${i++}`);
      }
    });
  });
  cloudReq.setHeader('Cookie', Cookie);
  cloudReq.setHeader('Content-Length', Buffer.byteLength(query));
  cloudReq.end(query);
}
// 选课
function XkAction(query, option, Cookie, res) {
  const stopReg = />((\S+上课时间冲突)|(你已经选择了课程[^<]+)|(选课成功[^<]+))/;
  const errorReg = /(对不起、非选课阶段不允许选课)|(请您登录后再使用)|(500 Servlet Exception)/;
  const continueReg = /(没有课余量)/;
  const queryOne = QueryString.stringify(query.one);
  const queryTwo = QueryString.stringify(query.two);
  const temp = Http.request(Api.GetOnce, responseIni => {
    responseIni.on('data', () => {});
    responseIni.on('end', () => {
      const getOnce = Http.request(Api.XkAction, responseOne => {
        responseOne.on('data', () => {});
        responseOne.on('end', () => {
          const realReq = Http.request(option, response => {
            let data = '';
            response.on('data', d => {
              data += iconv.decode(d, 'gbk');
            });
            response.on('end', () => {
              const result = stopReg.exec(data);
              if (result) {
                res.writeHead(200, { 'Access-Control-Allow-Origin': Api.CrossOrigin, 'Access-Control-Allow-Credentials': true });
                res.end(result[1]);
              } else if (continueReg.test(data)) {
                res.writeHead(200, { 'Access-Control-Allow-Origin': Api.CrossOrigin, 'Access-Control-Allow-Credentials': true });
                res.end('已开启抢课...');
                const i = 0;
                const cloud = new Promise(resolve => {
                  takeCourse(queryTwo, Cookie, option, resolve, i);
                });
                cloud.then(resData => {
                  if (/你已经选择了课程/.test(resData)) console.log('抢课成功');
                  console.log('抢课结束');
                });
              } else if (errorReg.test(data)) {
                res.writeHead(200, { 'Access-Control-Allow-Origin': Api.CrossOrigin, 'Access-Control-Allow-Credentials': true });
                res.end(errorReg.exec(data)[1]);
              } else {
                res.writeHead(200, { 'Access-Control-Allow-Origin': Api.CrossOrigin, 'Access-Control-Allow-Credentials': true });
                console.log(data);
                res.end('出现错误');
              }
            });
          });
          realReq.setHeader('Cookie', Cookie);
          realReq.setHeader('Content-Length', Buffer.byteLength(queryTwo));
          realReq.end(queryTwo);
        });
      });
      getOnce.setHeader('Cookie', Cookie);
      getOnce.end(queryOne);
    });
  });
  temp.setHeader('Cookie', Cookie);
  temp.end();
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
      req.on('end', () => {
        const { query, user } = JSON.parse(data);
        // getCookie(user, Api.LoginAction).then(cookie => {
        //   if (cookie !== 0) XkAction(query, Api.XkAction, cookie, res);
        //   else res.end('错误');
        // });
        XkAction(query, Api.XkAction, req.headers.cookie, res);
      });
      break;
    default:
      res.end('none');
      break;
  }
}).listen(8101);
console.log('server ing');
