/*var str = 'abcdef'*/
//var test = str.indexOf('b',3)
/*var test = str.lastIndexOf('d',-2)*/

/*var test = str.substring(1,-2)*/


/*var str = 'apple++=hello,ok,thank'*/
//var test = str.match('ao')
//var test = str.search('a','o')
/*var test = str.match(/a/)*/
//var test = str.search(/a/)

//var test = str.replace('a','x')
//console.log(str.length)
/*var test = str.replace(/a/g,function(arg1,arg2,arg3,arg4){
	//console.log(arg1)
	console.log(arg2)
	//console.log(arg3)
	//console.log(str.length)
	if(str.length > 5){
		return '_'
	}else{
		return 'aa'
	}
})*/

/*var ok = '~~~'
var test = str.concat(ok,'!!')*/
/*var test = str.split(',',3)*/

/*var ori = 88
var test = String.fromCharCode(88)*/

/*var str = 'apple++=hello,123q4?哈ok,thank'
var test = str.normalize(NFKC)*/

/*var str = 'a'
var test = str.repeat(5)*/

var str = 'my%20test.php?name=st%C3%A5le&car=saab^%^$#%^^啊啊啊 ^^';
/*var test1 = 'decode:' + decodeURI(str);
var test2 = 'decodeC:' + decodeURIComponent(str);*/
var test3 = 'es:' + escape(str);
var test4 = 'unes:' + unescape(str);

console.log(str)
/*console.log(test1)
console.log(test2)*/
console.log(test3)
console.log(test4)