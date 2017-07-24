@echo off
pushd %~dp0
call webpack
call webpack --config lib.config.js -p --define process.env.NODE_ENV='\"production\"'
call babili app.js admin.js --presets [es2015] -d ./ 
popd