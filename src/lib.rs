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
pub fn sine_series_f32(n: i32) -> f32 {
    let mut counter = 1;
    let stop = n + 1;
    let mut result: f32 = 0.0;

    while counter != stop {
        result = result + (counter as f32).sin();
        counter += 1;
    }

    result
}

#[wasm_bindgen]
pub fn sine_series_f64(n: i32) -> f64 {
    let mut counter = 1;
    let stop = n + 1;
    let mut result: f64 = 0.0;

    while counter != stop {
        result = result + (counter as f64).sin();
        counter += 1;
    }

    result
}

// https://rustwasm.github.io/docs/wasm-bindgen/reference/types/boxed-number-slices.html

#[wasm_bindgen]
pub fn take_boxed_number_slice_by_value(x: Box<[f64]>) {}

// returns an array (containing 0..42) to JS
#[wasm_bindgen]
pub fn return_boxed_number_slice() -> Box<[u32]> {
    (0..42).collect::<Vec<u32>>().into_boxed_slice()
}

#[wasm_bindgen]
pub fn take_option_boxed_number_slice(x: Option<Box<[u8]>>) {}

#[wasm_bindgen]
pub fn return_option_boxed_number_slice() -> Option<Box<[i32]>> {
    None
}

// Example function that receives array from JS, mutates and returns it:
#[wasm_bindgen]
pub fn add_one_to_each(x: Box<[u8]>) -> Box<[u8]> {
    let mut vec = Vec::new();
    
    for element in x.iter() {
        vec.push(element + 1);
    }

    let boxed: Box<[u8]> = vec.into_boxed_slice();
    
    boxed
}