// const url = 'http://202.115.47.141/loginAction.do';
// const zjh = '2014141462275';
// const mm = 'x9601157cd';

const form = document.createElement('form');
const zjh = document.createElement('input');
const mm = document.createElement('input');
form.action = 'http://202.115.47.141/loginAction.do';
form.method = 'POST';
zjh.name = 'zjh';
zjh.value = '2014141462275';
mm.name = 'mm';
mm.value = 'x9601157cd';

form.appendChild(zjh);
form.appendChild(mm);
document.body.appendChild(form);
form.submit();

const xhr = new XMLHttpRequest();
const fd = new FormData();
fd.append('zjh', '2014141462275');
fd.append('mm', 'x9601157cd');
xhr.open('POST', 'http://202.115.47.141/loginAction.do');
xhr.send(fd);
