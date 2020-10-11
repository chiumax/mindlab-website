# TESTING

This application uses Jest for unit testing functions and components. In Gatsby this requires some special set up because Gatsby uses some special Webpack build configurations. Setup for testing follows the [Gatsby-Jest documentation](https://www.gatsbyjs.com/docs/unit-testing/).

## Files

The following files are used for unit testing with Jest:

* `jest.config.js`
* `jest-preprocess.js`
* `loadershim.js`

## Running Unit Tests

You can run unit tests once via `npm run test`.

You can also run unit tests in watch mode via `npm run test -- --watch`
