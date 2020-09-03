extern crate js_sys;
extern crate web_sys;

mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

#[wasm_bindgen]
pub fn sine_series(n: i32) -> f32 {
    let mut counter = 1;
    let stop = n + 1;
    let mut result: f32 = 0.0;

    while counter != stop {
        result = result + (counter as f32).sin();
        counter += 1;
    }

    result
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
