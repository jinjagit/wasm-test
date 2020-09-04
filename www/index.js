import * as wasm from "wasm-test";

const sineSeries = (n) => {
  let i;
  let result = 0;
  for (i = 1; i < n + 1; i++) {
    result = result + Math.sin(i);
  }
  return result;
}

// JS benchmark
let jsText = document.getElementById("js-text");
let start = Date.now();
let result1 = sineSeries(10000000);
let t1 = Date.now() - start;

jsText.innerHTML = `Javascript only: ${t1} ms, with final result = ${result1}`;

// wasm benchmark
let wasmText = document.getElementById("wasm-text");
start = Date.now();
let result2 = wasm.sine_series(10000000); // call wasm function
let t2 = Date.now() - start;

wasmText.innerHTML = `wasm called from JS: ${t2} ms, with final result = ${result2}`;

// compare results
let summaryText = document.getElementById("summary-text");

if (t1 < t2) {
  summaryText.innerHTML = `wasm ran benchmark ${(t2 / t1).toFixed(2)} times SLOWER than Javascript`;
  summaryText.style.color = "red";
} else {
  summaryText.innerHTML = `wasm ran benchmark ${(t1 / t2).toFixed(2)} times faster than Javascript`;
  summaryText.style.color = "green";
}