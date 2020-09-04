import * as wasm from "wasm-test";

const sineSeries = (n) => {
  let i;
  let result = 0;
  for (i = 1; i < n + 1; i++) {
    result = result + Math.sin(i);
  }
  return result;
}

const compareResults = (textElement, tJS, tWasm) => {
  if (tJS < tWasm) {
    textElement.innerHTML = `wasm ran benchmark ${(tWasm / tJS).toFixed(2)} times SLOWER than Javascript`;
    textElement.style.color = "red";
  } else {
    textElement.innerHTML = `wasm ran benchmark ${(tJS / tWasm).toFixed(2)} times faster than Javascript`;
    textElement.style.color = "green";
  }
}

// JS benchmark
let jsText = document.getElementById("js-text");
let start = Date.now();
let result1 = sineSeries(10000000);
let t1 = Date.now() - start;

jsText.innerHTML = `Javascript only (64-bit floats): ${t1} ms, with final result = ${result1}`;

// wasm f32 benchmark
let wasmF32Text = document.getElementById("wasm-f32-text");
start = Date.now();
let result2 = wasm.sine_series_f32(10000000); // call wasm function
let t2 = Date.now() - start;

wasmF32Text.innerHTML = `wasm (32-bit floats) called from JS: ${t2} ms, with final result = ${result2}`;

// compare results
let summaryF32Text = document.getElementById("summary-f32-text");
compareResults(summaryF32Text, t1, t2);

// wasm f64 benchmark
let wasmF64Text = document.getElementById("wasm-f64-text");
start = Date.now();
let result3 = wasm.sine_series_f64(10000000); // call wasm function
let t3 = Date.now() - start;

wasmF64Text.innerHTML = `wasm (64-bit floats) called from JS: ${t3} ms, with final result = ${result3}`;

// compare results
let summaryF64Text = document.getElementById("summary-f64-text");
compareResults(summaryF64Text, t1, t3);
