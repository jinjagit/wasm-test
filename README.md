# Develop and deploy wasm (compiled from Rust) + JS:

### Note: this process uses Travis CI to deploy to GitHub Pages.

Cloned https://github.com/sn99/wasm-template-rust  
(see this repo. for Siddharth Naithani's excellent template and readme. This was invaluable to me in getting the Travis CI to deploy the wasm package)  

Created new directory: repos/wasm-test + `git init`  

Copied contents into new directory (repos/wasm-test)  
& added .gitignore & .travis.yml + copied each file's contents from the cloned repo.  

Created repo on GitHub with appropriate name (wasm-test), with no readme  

`cd wasm-test`  

`git add .`  
`git commit -m "initial commit"`  

`git remote add origin git@github.com:jinjagit/wasm-test.git`  
`git push origin master`  

Changed name in cargo.toml to `name = "wasm-test"`  

Changed lines in www/package.json to:  
```
"dependencies": {
    "wasm-test": "file:../pkg"
  },
  ```

Changed lines in src/lib.rs to:  
```
pub fn greet() {
  alert("Hello, from Rust compiled to wasm!");
}
```
(just to prove I am building from a new change in the Rust code)  

In project root:  
`wasm-pack build`  

In www directory:  
`npm install`  

Changed line in www/index.js to `import * as wasm from "wasm-test";`  
Changed line in www/index.html to `<title>Wasm test</title>`  

`npm install` again  

`npm run start` => runs @ http://localhost:8080/  

`cd ..` (to project root)  
`git add .`  
`git commit -m "modify to my changes"`  
`git push origin master`  

Created gh-pages branch on GitHub  

Created GitHub personal access token  

Went to: https://travis-ci.com/signin and signed in with GitHub  
Approved the installation of Travis CI for all my GitHub repos.  
Found wasm-test in repos list  
Clicked 'settings' for repo.  
Added env. var: `GITHUB_TOKEN` value: \<personal access token value\>  
Selected 'Trigger build' from settings and ran with no custom settings  

=> IT LIVES!! (running @ https://jinjagit.github.io/wasm-test/) 

I then rewrote index.js to run the benchmarks it now runs, and index.html to include \<p\> elements for displaying information and benchmark results on page.  
I also rewrote the Rust src/lib.rs file to contain the sine_series(n) function needed for the wasm benchmark, and deleted unused function + `extern` statements from lib.rs.

`wasm-pack build` (from project root)

Lastly, I added and commited changes and pushed to GitHub, and the Travis CI took care of deploying the package to GitHub Pages :-)

## License

Licensed under either of these:

 * Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or
   https://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or
   https://opensource.org/licenses/MIT)