/*window.addEventListener('message', function(e) {
  console.log(e.data);
  console.log(e.source);
  console.log(e.target);
},false);

var test2 = window.open('http://localhost:88/test2.html');
test2.postMessage('Hello World!', 'http://localhost:88/test2.html');
*/

/*window.onload=function() {
    window.frames[0].postMessage('收到没', '*');//在这里发送数据
}*/

/*var test2 = window.open('http://localhost:88/test2.html');
test2.postMessage('Hello World!', '*');*/

if(window.Notification && Notification.permission !== "denied") {
	Notification.requestPermission(function(status) {
		alert('请开启通知!')
		var n = new Notification('通知标题', { body: '这里是通知内容！' }); 
	});
}