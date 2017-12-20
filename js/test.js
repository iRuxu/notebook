var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

var test = iterator.next()  // { value: "h", done: false }
console.log(test)
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }