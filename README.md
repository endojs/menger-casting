# Menger Casting Model

A JavaScript visualization of the inverse of a [menger sponge](https://en.wikipedia.org/wiki/Menger_sponge), which Alexa Finlay suggested we call a "casting". [Live demo](http://endojs.github.io/menger-casting).

Designed for consideration as a possible logo for [endo](https://github.com/endojs)

This repo can both be included as a browserifiable module, and includes a sample app.

## Installation

Not currently on npm, so install from github:
```
npm i endojs/menger-casting#master
yarn add endojs/menger-casting#master
```

## API
```javascript
var ModelViewer = require('menger-casting')

// To render with fixed dimensions:
var viewer = ModelViewer({

  // Dictates whether width & height are px or multiplied
  pxNotRatio: true,
  width: 500,
  height: 400,
  // pxNotRatio: false,
  // width: 0.9,
  // height: 0.9,

  // To make the face follow the mouse.
  followMouse: false,

  // head should slowly drift (overrides lookAt)
  slowDrift: false,

})

// add viewer to DOM
var container = document.getElementById('logo-container')
container.appendChild(viewer.container)

// look at something on the page
viewer.lookAt({
  x: 100,
  y: 100,
})

// enable mouse follow
viewer.setFollowMouse(true)

// deallocate nicely
viewer.stopAnimation()
```

## Modifying

The sample app address is `index.html`.
The sample app javascript is `bundle.js`, which is built from `sample.js` using the `convert` and `build` tasks (see the `package.json`).

