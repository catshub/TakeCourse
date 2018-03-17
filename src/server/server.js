const Http = require('http');
const Api = require('./api');
const iconv = require('iconv-lite');

Http.createServer((req, res) => {
  // const user = url.parse(req.url).query;
  let data = '';
  let option = null;
  switch (req.url) {
    case '/loginAction':
      req.on('data', d => {
        data += iconv.decode(d, 'gbk');
      });
      req.on('end', () => {
        option = Api.LoginAction;
        const realReq = Http.request(option, response => {
          data = '';
          response.on('data', d => {
            data += iconv.decode(d, 'gbk');
          });
          response.on('end', () => {
            res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
            res.end(data);
          });
        });
        realReq.end(data);
      });
      break;
    default:
      res.end('none');
      break;
  }
}).listen(8101);
console.log('server ing');
