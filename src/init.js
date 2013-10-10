// Stage setup
var stage = new PIXI.Stage(0xEEEEEE, true);
var renderer = PIXI.autoDetectRenderer(320, 568, null, false, true);

document.body.appendChild(renderer.view);

// Utils
function randomTo(number) {
  var number = Math.floor(Math.random() * number);
  return number;
}

// Generate Matrix
DotsController.start();


// Animate da loop
var animate = function(){
  renderer.render(stage);
  requestAnimFrame(animate);
  TWEEN.update();
}

requestAnimFrame(animate);
