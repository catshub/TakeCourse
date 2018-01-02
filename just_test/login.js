const http = require('http');
const querystring = require('querystring');
const fd = querystring.stringify({
  'zjh' : '2014141462275',
  'mm' : 'x9601157cd'
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
  }
};
const promise = new Promise((resolve) => {
  const request = http.request(options, callback);

  // fd.append('zjh', '2014141462275');
  // fd.append('mm', 'x9601157cd');
  request.write('zjh=2014141462275&mm=x9601157cd');

  request.end();
  function callback(response) {
    let data = '';
    // debugger
    response.on('data', d => (data += d));
    response.on('end', () => resolve(data));
  }
});
promise.then(data=>{
  debugger
  console.log(data);  
})