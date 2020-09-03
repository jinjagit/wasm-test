import * as wasm from "wasm-test";

let jsText = document.getElementById("js-result");

let start = Date.now();

var i;
var result = 0;
for (i = 1; i < 10000001; i++) {
  result = result + Math.sin(i);
} 

let end = Date.now() - start;

jsText.innerHTML = `Javascript only: ${end} ms, with final result = ${result}`;

//start = Date.now();

let res = wasm.times_two(21.3);

//end = Date.now() - start;

//console.log(end);

console.log(res);