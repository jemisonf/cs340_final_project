# Content

This directory contains frontend code for msgr intended to be built and served statically. Run `npm install` before doing any operations with the repository. This project uses React, Webpack, Babel, React Router, and SASS.

## Development

When developing, use the webpack dev server by running `npm run pack-dev`. This will run a webpack dev server which will build javascript files as you edit them and serve them to `localhost:8080`. This does *not* build your SASS files; for that, run `npm run sass` every time you want to recompile `main.css` (a better solution is TBD).

## Production

When deploying to production, you need to build static versions of the content. Build javascript content with `npm run pack` and CSS content with `npm run sass`. Files will be found in `content/dist` along with `index.html`, which should already be set up.
