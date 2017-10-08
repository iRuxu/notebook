var obj = {
    name: '小明',
    age: '5',
    date: new Date(),
    do : function (){
    	console.log('hi')
    }
};

var test = JSON.stringify(obj,function(key,val){
	/*if(key == 'age'){
		return undefined
	}*/
	return val
},4)
console.log(test)

console.log(JSON.parse('true'))

console.log(eval(test))