// adapted from Siddharth Naithani's original file, 2020
// https://github.com/sn99/wasm-template-rust/blob/master/src/lib.rs

mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn sine_series(n: i32) -> f64 {
    let mut counter = 1;
    let stop = n + 1;
    let mut result: f64 = 0.0;

    while counter != stop {
        result = result + (counter as f64).sin();
        counter += 1;
    }

    result
}
