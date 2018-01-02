// const options = {
//   hostname: '202.115.47.141',
//   port: 80,
//   path: '/jxpgXsAction.do?oper=wjShow',
//   method: 'POST',
//   headers: {
//     Cookie: data.cookie,
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(postData),
//   },
// };

const http = require('http');
const options = {
  hostname: '202.115.47.141',
  port: 80,
  path: '/jxpgXsAction.do?oper=listWj&pageSize=100',
  method: 'GET',
  headers: {
    Cookie: 'JSESSIONID=dcaqc7bkda91Bdbzqoscw',
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Length': Buffer.byteLength(postData),
  }
};
const promise = new Promise((resolve) => {
  const request = http.request(options, callback);
  request.end();
  function callback(response) {
    let data = '';
    response.on('data', d => (data += d));
    response.on('end', () => resolve(data));
  }
});
promise.then(data=>{
  console.log(data);  
})