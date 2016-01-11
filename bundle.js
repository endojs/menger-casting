;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mousePointer = require('./lib/mouse-pointer')
var el, elBox

module.exports = function(opts){
  window.scene = new THREE.Scene()

  // CAMERA SETUP
  window.camera = new THREE.PerspectiveCamera( 45, opts.width / opts.height, 1, 2000 )
  camera.position.z = 400
  camera.lookAt(scene.position)

  // RENDERER OPTIONS
  window.renderer = new THREE.WebGLRenderer( {
    antialias: true,
    alpha: true,
  })

  setSize(opts)
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.gammaInput = true
  renderer.gammaOutput = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.cullFace = THREE.CullFaceBack

  // DOM STUFF
  var container = document.getElementById(opts.targetDivId)
  el = container.querySelector('canvas')
  if (el) elBox = el.getBoundingClientRect()
  container.appendChild( renderer.domElement )

  // MODEL LOADING:
  var loader = new THREE.OBJMTLLoader()
  loader.load( './fox.obj', './fox.mtl', function ( object ) {
    window.object = object
    object.position = scene.position

    object.rotation.x = 0
    object.rotation.y = 0
    object.rotation.z = 0

    scene.add( object )

    var ambiColor = '#FFFFFF'
    var ambientLight = new THREE.AmbientLight(ambiColor)
    scene.add( ambientLight )

    animate()
  })

  // handle screen resize
  window.addEventListener('resize', setSize.bind(null, opts))

  // track mouse movements
  var mouseX = window.innerWidth/2, mouseY = window.innerHeight/2
  window.addEventListener('mousemove', function(event){
    mouseX = event.clientX
    mouseY = event.clientY
  })

  function animate() {
    var time = Date.now()

    if (opts.followMouse) {
      // look at mouse left-right
      lookAtMouse(object)
    } else {
      // drift left-right
      object.rotation.y = 0.5 + (Math.sin(time/3000) * 0.2)
      object.rotation.x = 0.1 + (Math.sin(time/3000) * 0.2)
      object.rotation.z = -0.1 + (Math.sin(time/2000) * 0.03)
    }

    // add other drift
    requestAnimationFrame( animate )
    render()
  }

  function lookAtMouse(object) {
    var mouse = {
      x: mouseX,
      y: mouseY,
    }

    if (elBox) {
      mousePointer(object, mouse, elBox);
    } else {
      el = container.querySelector('canvas')
      if (el) elBox = el.getBoundingClientRect()
    }
  }

  function render() {
    // setSize(opts)
    renderer.render( scene, camera )
  }
}

function setSize(opts){
  if (el) elBox = el.getBoundingClientRect()

  if (!opts.pxNotRatio) {
    var width = window.innerWidth * opts.width
    width = Math.min(width, 800)
    var height = width
    camera.aspect = height / width
    camera.updateProjectionMatrix()
    console.log('SETTING SIZE:', width, height)
    renderer.setSize(width, height)
  } else {
    renderer.setSize(opts.width, opts.height)
  }
}

},{"./lib/mouse-pointer":2}],2:[function(require,module,exports){
module.exports = lookAtMouse;

function lookAtMouse (object, mouse, elBox) {
  var elOrigin = getOriginFrom(elBox);

  var softness = 30

  var x = (mouse.x - elOrigin.x) / softness
  var y = (mouse.y - elOrigin.y) / softness * -1
  var z = 10

  var mousePos = new THREE.Vector3(x, y, z) 
  object.lookAt( mousePos )
}

function getOriginFrom(elBox) {
  var x = elBox.left + (elBox.width / 2)
  var hThird = elBox.height / 3
  var y = elBox.top + (2 * hThird)
  return {x: x, y: y}
}

},{}],3:[function(require,module,exports){
var viewer = require('./');

// To render with fixed dimensions:
// viewer({
//   pxNotRatio: true, // Dictates whether width & height are px or multiplied
//   width: 500,
//   height: 400,
//   targetDivId: 'modelDivLarge'
// })
//

viewer({
  targetDivId: 'logo-container',
  followMouse: !detectMobile(),
  // Dictates whether width & height are px or multiplied
  pxNotRatio: false,
  width: 0.4,
  height: 0.4,
  // To render with fixed dimensions:
  // pxNotRatio: true,
  // width: 500,
  // height: 400,
})

function detectMobile() {
  return (
      navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
  )
}
},{"./":1}]},{},[3])
;