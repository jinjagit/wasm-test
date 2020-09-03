# Develop and deploy wasm (compiled from Rust) + JS:

### Note: this process uses Travis CI to deploy to GitHub Pages.

Clone https://github.com/sn99/wasm-template-rust  
(see this repo. for Siddharth Naithani's excellent template and readme. This was invaluable to me in getting the Travis CI to deploy the wasm package)  

Create new directory: repos/wasm-test + `git init`  

Copy contents into new directory (repos/wasm-test)  
& add .gitignore & .travis.yml + copy each file's contents from the cloned repo.  

Create repo on GitHub with appropriate name (wasm-test), with no readme  

`cd wasm-test`  

`git add .`  
`git commit -m "initial commit"`  

`git remote add origin git@github.com:jinjagit/wasm-test.git`  
`git push origin master`  

Change name in cargo.toml to `name = "wasm-test"`  

Change lines in www/package.json to:  
```
"dependencies": {
    "wasm-test": "file:../pkg"
  },
  ```

Change lines in src/lib.rs to:  
```
pub fn greet() {
  alert("Hello, from Rust compiled to wasm!");
}
```
(just to prove we are building from a new change in the Rust code)  

In project root:  
`wasm-pack build`  

In www directory:  
`npm install`  

Change line in www/index.js to `import * as wasm from "wasm-test";`  
Change line in www/index.html to `<title>Wasm test</title>`  

`npm install` again  

`npm run start` => runs @ http://localhost:8080/  

`cd ..` (to project root)  
`git add .`  
`git commit -m "modify to my changes"`  
`git push origin master`  

Create gh-pages branch on GitHub  

Create GitHub personal access token  

Go to: https://travis-ci.com/signin and sign in with GitHub  
Approve the installation of Travis CI for all GitHub repos, or just this repo.  
Find wasm-test in repos list  
Click 'settings' for repo.  
Add env. var: `GITHUB_TOKEN` value: \<personal access token value\>  
Select 'Trigger build' from settings and run with no custom settings  

=> IT LIVES!! (running @ https://jinjagit.github.io/wasm-test/) 

Then, rewrite index.js to run the benchmarks it now runs, and index.html to include \<p\> elements for displaying information and benchmark results on page.  
Then, rewrite the Rust src/lib.rs file to contain the sine_series(n) function needed for the wasm benchmark, and delete unused function + `extern` statements from lib.rs.

`wasm-pack build` (from project root)

Lastly, add and commit changes and push to GitHub, and the Travis CI will take care of deploying the package to GitHub Pages :-)

## License

Licensed under either of these:

 * Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or
   https://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or
   https://opensource.org/licenses/MIT)