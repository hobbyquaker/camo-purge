# camo-purge

[![NPM version](https://badge.fury.io/js/camo-purge.svg)](http://badge.fury.io/js/camo-purge)
[![Dependency Status](https://img.shields.io/gemnasium/hobbyquaker/camo-purge.svg?maxAge=2592000)](https://gemnasium.com/github.com/hobbyquaker/camo-purge)
[![Build Status](https://travis-ci.org/hobbyquaker/camo-purge.svg?branch=master)](https://travis-ci.org/hobbyquaker/camo-purge)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License][mit-badge]][mit-url]

> Purge Github Image Cache for Readme Badges :shower: :octocat:

Use this if you want to automatically purge the Github Image Cache for your Readme Badges in your Build Process.


## Usage

In your Node.js project do:

`npm install --save-dev camo-purge`

You can supply a repository url via the `--repository` option. If you omit that option camo-purge will try to find the 
repository url in `../../package.json`.

You can then e.g. just prepend `camo-purge ; ` to your npm test script.

## License

MIT Copyright (c) 2017 Sebastian Raff

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
