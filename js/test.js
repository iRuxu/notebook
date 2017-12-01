var body = document.body
body.onfocus = function (e){
	console.log('ok')
	console.log(e.target)
	console.log(e.relatedTarget)
}