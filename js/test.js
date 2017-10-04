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
var results = x => x*x
console.log(results(2))