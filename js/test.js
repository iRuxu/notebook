'use strict'

function foo(i){
	console.log('函数:'+i)
	return function (){
		console.log('闭包:'+i)
		return ++i
	}
}

var inc = foo(1)
console.log(inc())
console.log(inc())
console.log(inc())
