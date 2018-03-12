const Http = require('http');
const iconv = require('iconv-lite');

Http.createServer((req, res) => {
  // const user = url.parse(req.url).query;
  // console.log(user);
  // const fd = Querystring.stringify({
  //   zjh: '2014141462275',
  //   mm: 'x9601157cd',
  // });
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
    const request = Http.request(options2, response => {
      let data = '';
      response.on('data', d => {
        data += iconv.decode(d, 'gbk');
      });
      response.on('end', () => resolve(data));
    });
    request.end();
  });
  promise.then(data => {
    const reg = /欢迎光临&nbsp;(\S+)&nbsp;\|/g;
    res.end(data);
    console.log(reg.exec(data)[1]);
  });
}).listen(8112);
console.log('server ing');
