# addons-blog

[![CircleCI](https://circleci.com/gh/mozilla/addons-blog.svg?style=svg)](https://circleci.com/gh/mozilla/addons-blog)

This is the AMO Blog, which uses WP as a headless CMS with 11ty as a static generator.

## Getting started

1. clone the project
2. run `yarn` to install the dependencies
3. run `yarn start` to build the blog and serve it locally

For other tasks, take a look at the available commands in the section below.

## Available commands

In the project directory, you can run the following commands. There are a few commands not mentioned here (see `package.json`) but those are only used by internal processes.

### `yarn prettier`

This runs [Prettier][] to automatically format the entire codebase.

### `yarn prettier-dev`

This runs [Prettier][] on only your changed files. This is intended for development.

### `yarn build`

This is the _base_ command for building the content of the blog in the `build/` directory.

### `yarn build:debug`

This is similar to `yarn build:serve` but with Eleventy debug logs turned on.

### `yarn build:production`

This builds the blog in production mode, which essentially optimizes the different assets.

### `yarn build:serve`

This starts a web server to serve the blog on local port `8081`.

### `yarn build:wptheme`

This command builds a WordPress theme that is used on our WP instance (mainly for previews).

### `yarn start`

This starts a web server to serve the blog on local port `8081` as well as watchers for the assets (JS/CSS files). Any change made will rebuild the blog and update it automatically. This command is for development purposes.

### `yarn start:debug`

This is similar to `yarn start` but with Eleventy debug logs turned on.

### `yarn start:nocache`

This is similar to `yarn start` but the WordPress API results won't be cached locally.

### `yarn sass:build`

This compiles the Sass files and generates a `styles.css` file.

### `yarn sass:watch`

This starts a watcher to rebuild the CSS files automatically.

### `yarn script:build`

This compiles the JavaScript files and generates a `bundle.js` file.

### `yarn script:watch`

This starts a watcher to rebuild the JS files automatically.

## Production builds

The Eleventy process and the JS and CSS builds happen in series. Then a 3rd `asset-pipeline` process initiates and takes the built content from `./build` directory and runs it through various optimizations.

During these optimizations, the following takes place:

- Binary files are versioned with hashes in the file names.
- References to these file in CSS and JS are updated.
- CSS and JS are minified.
- The HTML is processed to update the references to the assets new hash-based filenames.

All of this means that we can serve the site with far-future `Expires` headers. If the resource is in the browser's cache, the browser won't even make a request for it. To break the cache, the resource's URL needs to change. When something is updated and the script is re-run, the hash in the filename will change, so the new filename won't be cached and the browser will know to fetch it. This helps the site be fast.

Whilst the `asset-pipline` script is custom, it leverages a lot of existing libs where possible, these include Terser, postHTML, postCSS, and various plugins.

### Asset paths

For the `asset-pipeline` script to do its thing, all you need to do is refer to all assets with a path beginning with `/assets/`. If you do that, everything else is handled for you ✨

[prettier]: https://prettier.io/
