const Http = require('http');
const Api = require('./api');
const iconv = require('iconv-lite');
const QueryString = require('querystring');
const chalk = require('chalk');

const Log = message => console.log(`[${new Date().toLocaleString()}] `, message);
const Tip = message => console.log(chalk.yellow.bold(`[${new Date().toLocaleString()}] `, message));
const Error = message => console.log(chalk.red(`[${new Date().toLocaleString()}] `, message));

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
    Log(QueryString.stringify(userData));
    realReq.end(QueryString.stringify(userData));
  });
}

// getName
function getName(Cookie) {
  return new Promise(resolve => {
    const scuReq = Http.request(Api.sTop, response => {
      let scuData = '';
      response.on('data', d => {
        scuData += iconv.decode(d, 'gbk');
      });
      response.on('end', () => {
        const reg = /欢迎光临&nbsp;(\S+)&nbsp;\|/;
        const name = reg.exec(scuData)[1];
        resolve(name);
      });
    });
    scuReq.setHeader('Cookie', Cookie);
    scuReq.end();
  });
}

// login
function loginAction(userData, option, res, origin) {
  const scuReq = Http.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      if (scuData.includes('学分制综合教务')) {
        const cookie = response.headers['set-cookie'][0].split(';')[0];
        getName(cookie).then(name => {
          res.setHeader('Set-Cookie', cookie);
          res.writeHead(200, {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': true,
          });
          const resData = JSON.stringify({ cookie, name });
          res.end(resData);
          Tip(`${name}(${userData.zjh}): Login`);
        });
      } else {
        res.writeHead(200, {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': true,
        });
        res.end('登录失败');
      }
    });
  });
  // scuReq.setHeader('Content-Length', Buffer.byteLength(userData));
  scuReq.end(QueryString.stringify(userData));
}

// 云抢课
function takeCourse(query, Cookie, option, resolve, name, zjh, count) {
  const cloudReq = Http.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      if (!/(没有课余量)/.test(scuData)) {
        resolve({ scuData, count });
      } else {
        setTimeout(() => {
          if (count % 1000 === 0) Log(`${name}(${zjh}): 抢课中.... 抢课次数: ${count}`);
          takeCourse(query, Cookie, option, resolve, name, zjh, count + 1);
        }, 500);
      }
    });
  });
  cloudReq.setHeader('Cookie', Cookie);
  // cloudReq.setHeader('Content-Length', Buffer.byteLength(query));
  cloudReq.end(query);
}
// 选课
function XkAction(queryData, option, Cookie = 'none', res, origin) {
  const stopReg = />((\S+上课时间冲突)|(你已经选择了课程[^<]+)|(选课成功[^<]+))/;
  const errorReg = /(对不起、非选课阶段不允许选课)|(请您登录后再使用)|(500 Servlet Exception)/;
  const continueReg = /(没有课余量)/;
  const querySecond = QueryString.stringify(queryData.query.second);
  const queryThird = QueryString.stringify(queryData.query.third);
  const { zjh, name } = queryData.user;
  const reqFirst = Http.request(Api.XkFirst, resFirst => {
    resFirst.on('data', () => {});
    resFirst.on('end', () => {
      const reqSecond = Http.request(option, resSecond => {
        resSecond.on('data', () => {});
        resSecond.on('end', () => {
          const realReq = Http.request(option, response => {
            let scuData = '';
            response.on('data', d => {
              scuData += iconv.decode(d, 'gbk');
            });
            response.on('end', () => {
              res.writeHead(200, { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Credentials': true });
              if (stopReg.test(scuData)) {
                Log(`${name}(${zjh}): ${stopReg.exec(scuData)[1]}`);
                res.end(stopReg.exec(scuData)[1]);
              } else if (continueReg.test(scuData)) {
                Tip(`${name}(${zjh}): 开启抢课...`);
                res.end('已开启抢课...');
                const cloud = new Promise(resolve => {
                  takeCourse(queryThird, Cookie, option, resolve, name, zjh, 1);
                });
                cloud.then(resData => {
                  if (/你已经选择了课程/.test(resData.scuData)) Tip(`${name}(${zjh}): 抢课完成,抢课次数: ${resData.count}`);
                  Tip(`${name}(${zjh}): 抢课结束,结果不明 ${resData.scuData}`);
                });
              } else if (errorReg.test(scuData)) {
                Log(`${name}(${zjh}): ${errorReg.exec(scuData)[0]}`);
                res.end(errorReg.exec(scuData)[0]);
              } else {
                Error(`${name}(${zjh}): ${scuData}`);
                res.end('出现错误');
              }
            });
          });
          realReq.setHeader('Cookie', Cookie);
          // realReq.setHeader('Content-Length', Buffer.byteLength(queryThird));
          realReq.end(queryThird);
        });
      });
      reqSecond.setHeader('Cookie', Cookie);
      reqSecond.end(querySecond);
    });
  });
  reqFirst.setHeader('Cookie', Cookie);
  reqFirst.end();
}

// server
Http.createServer((req, res) => {
  const origin = Api.CrossOrigin.test(req.headers.origin) ? req.headers.origin : 'http://draven-system.xhuyq.me';
  let data = '';
  switch (req.url) {
    case '/loginAction':
      req.on('data', d => {
        data += d;
      });
      req.on('end', () => loginAction(JSON.parse(data), Api.LoginAction, res, origin));
      break;
    case '/xkAction':
      req.on('data', d => {
        data += d;
      });
      req.on('end', () => {
        // getCookie(user, Api.LoginAction).then(cookie => {
        //   if (cookie !== 0) XkAction(query, Api.XkAction, cookie, res);
        //   else res.end('错误');
        // });
        XkAction(JSON.parse(data), Api.XkAction, req.headers.cookie, res, origin);
      });
      break;
    default:
      res.end('none');
      break;
  }
}).listen(8101);
Log('server ing');
