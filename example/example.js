var copy = require('copy-to-clipboard')


document.addEventListener('keypress', function (event) {
  if (event.keyCode === 99) { // the c key
    var svg = document.querySelector('svg')
    var inner = svg.innerHTML
    var head = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" '
    + '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> '
    + '<svg width="521px" height="521px" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events">'
    var foot = '</svg>'

     var full = head + inner + foot;

     copy(full)
  }
})

var createViewer = require('../index')

var viewer = createViewer({
  width: 0.4,
  height: 0.4,
  followMouse: false,
  followMotion: false,
});

console.log(viewer);

const colors = ['255,0,0', '255,255,255'];

window.addEventListener('load', () => {
  container.appendChild(viewer.container)
  viewer.spin();
  viewer.startAnimation();

  const bodyColorPicker = document.querySelector('#bodyColorPicker');
  bodyColorPicker.addEventListener('input', (event) => {
    const newColor = event.target.value;
    colors[0] = hexToRgb(newColor);
    console.log(colors);
    viewer.reRender(colors);
  })

  const capColorPicker = document.querySelector('#capColorPicker');
  capColorPicker.addEventListener('input', (event) => {
    const newColor = event.target.value;
    colors[1] = hexToRgb(newColor);
    console.log(colors);
    viewer.reRender(colors);
  })

  const backgroundColorPicker = document.querySelector('#backgroundColorPicker');
  backgroundColorPicker.addEventListener('input', (event) => {
    const newColor = event.target.value;
    document.body.style.background = newColor;
  })

  const spinSpeedPicker = document.querySelector('#spinSpeedPicker');
  spinSpeedPicker.addEventListener('input', (event) => {
    const newSpeed = event.target.value;
    viewer.setSpeed(newSpeed);
  })
})

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}
