const Http = require('http');
const Querystring = require('querystring');
const url = require('url');

console.log(Querystring.stringify({
  zjh: '2014141462275',
  mm: 'x9601157cd',
}));
Http.createServer((req, res) => {
  const user = url.parse(req.url).query;
  console.log(user);
  const fd = Querystring.stringify({
    zjh: '2014141462275',
    mm: 'x9601157cd',
  });
  console.log(typeof fd);
  const options = {
    host: '202.115.47.141',
    port: 80,
    path: '/loginAction.do',
    method: 'POST',
    headers: {
      // Cookie: 'JSESSIONID=dcaqc7bkda91Bdbzqoscw',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(fd),
    },
  };
  const options2 = {
    host: '202.115.47.141',
    port: 80,
    path: '/menu/s_top.jsp',
    method: 'GET',
    headers: {
      Cookie: 'JSESSIONID=bcdtleZjhcTln_zeasziw',
    },
  };
  const promise = new Promise(resolve => {
    const request = Http.request(options, response => {
      let data = '';
      response.on('data', d => {
        data += d;
      });
      response.on('end', () => resolve(data));
    });
    request.write(user);
    request.end();
  });
  promise.then(data => {
    console.log(data);
    const promise2 = new Promise(resolve2 => {
      const request = Http.request(options2, response => {
        let data2 = '';
        response.on('data', d => {
          data2 += d;
        });
        response.on('end', () => resolve2(data2));
      });
      request.end();
    });
    promise2.then(data2 => {
      console.log(data2);
      res.end(data2);
    });
  });
}).listen(8101);
console.log('server ing');
