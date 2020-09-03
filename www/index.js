import * as wasm from "wasm-test";

const sineSeries = (n) => {
  let i;
  let result = 0;
  for (i = 1; i < n + 1; i++) {
    result = result + Math.sin(i);
  }
  return result;
}

let jsText = document.getElementById("js-text");
let start = Date.now();
let result1 = sineSeries(10000000);
let end = Date.now() - start;


jsText.innerHTML = `Javascript only: ${end} ms, with final result = ${result1}`;

let wasmText = document.getElementById("wasm-text");

start = Date.now();

let result2 = wasm.sine_series(10000000);

end = Date.now() - start;

wasmText.innerHTML = `wasm called from JS: ${end} ms, with final result = ${result2}`;

console.log(result2);