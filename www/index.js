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

jsText.innerHTML = `Javascript only (64-bit floats): ${t1} ms, with final result = ${result1}`;

// wasm f32 benchmark
let wasmF32Text = document.getElementById("wasm-f32-text");
start = Date.now();
let result2 = wasm.sine_series_f32(10000000); // call wasm function
let t2 = Date.now() - start;

wasmF32Text.innerHTML = `wasm (32-bit floats) called from JS: ${t2} ms, with final result = ${result2}`;

// compare results
let summaryF32Text = document.getElementById("summary-f32-text");

if (t1 < t2) {
  summaryF32Text.innerHTML = `wasm ran benchmark ${(t2 / t1).toFixed(2)} times SLOWER than Javascript`;
  summaryF32Text.style.color = "red";
} else {
  summaryF32Text.innerHTML = `wasm ran benchmark ${(t1 / t2).toFixed(2)} times faster than Javascript`;
  summaryF32Text.style.color = "green";
}

// wasm f64 benchmark
let wasmF64Text = document.getElementById("wasm-f64-text");
start = Date.now();
let result3 = wasm.sine_series_f64(10000000); // call wasm function
let t3 = Date.now() - start;

wasmF64Text.innerHTML = `wasm (64-bit floats) called from JS: ${t3} ms, with final result = ${result3}`;

// compare results
let summaryF64Text = document.getElementById("summary-f64-text");

if (t1 < t3) {
  summaryF64Text.innerHTML = `wasm ran benchmark ${(t3 / t1).toFixed(2)} times SLOWER than Javascript`;
  summaryF64Text.style.color = "red";
} else {
  summaryF64Text.innerHTML = `wasm ran benchmark ${(t1 / t3).toFixed(2)} times faster than Javascript`;
  summaryF64Text.style.color = "green";
}