'use strict'


jQuery(function($){

});


var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

console.log(data.toString())