// html代码为 <p id="p">foobar</p>
var p = document.getElementById('p');
var test = p.firstChild;
var newText = test.splitText(3);
console.log(newText)