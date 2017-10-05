//var arr = [1,2,3,4,5,6,7,8];

//map & forEach
/*var add = function(num){
	num += 1
	//console.log(num)
	return num
}
//var test = arr.forEach(add)
var test = arr.map(add)
console.log(test)
*/

//reduce
/*var test = arr.reduceRight(function(total,val,index,arr){
	console.log('' + total + '+' + val)
	total += val
	console.log('=' + total)
	return total
})
console.log(test)*/


//质数
/*function isPrime(n){
	if(n <= 3) return false
	if(n % 2 == 0 || n % 3 == 0) return false
	//console.log(Math.sqrt(n))
	for(var i = 2 ; i<= Math.sqrt(n); i++){
		if (n % i == 0){
			return false
			break
		}else{
			return true
		}
	}
}*/
/*var test = isPrime(11)
console.log(test)*/
/*var test = arr.filter(isPrime)
console.log(test)*/


/*var arr = [2,124,12,23,21]
var test = arr.reverse()
console.log(arr)
console.log(test)*/

/*var arr = [2,78,11]
var test = arr.find(function(item){
	return item > 150
})
console.log(test)*/

/*function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(
        	(function () {
            	return i * i;
        	})()
        );
    }
    console.log(i)
    console.log(arr)
    return arr;
}

var results = count()*/
/*var results = x => x*x
console.log(results(2))*/

/*window.test = 'ok'
console.log(typeof window.aa === 'undefined')*/

/*'use strict'
function Person(name){
	this.name = name;
	this.hi = function (){console.log('hello, ' + name)}
	console.log(this)
}

var test = Person()
console.log(name)
console.log(hi)*/
/*var o = new Person('iRuxu')
var test = o.constructor
console.log(test)*/

/*function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    // 调用Student构造函数，绑定this变量:
    Student.call(this, props);
    this.grade = props.grade || 1;
}

var test = PrimaryStudent({name:'ok'})
console.log(test)

function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}*/
/*class Student {
    constructor(name,number) {
        this.name = name;
        this.number = number;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}

class PrimaryStudent extends Student{
	constructor(name,grade){
		super(name);
		this.grade = grade;
	}

	go(){
		console.log('ok~~')
	}
}

var test = new PrimaryStudent('iRuxu',5)
console.log(test)
//console.log(test.hello())
console.log(test.go())
*/
