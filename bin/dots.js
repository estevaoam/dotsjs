// Dot class
var Dot = function(x, y){
  this.defaultRadius = Dot.Defaults.defaultRadius;
  this.createObject(x, y);
  return this;
}

Dot.Defaults = {
  defaultRadius: 8,
  availableColors: [
    0xf35b41,
    0x8bb7fa,
    0x9955b5,
    0xe2df00,
    0x8ae88c
  ]
}

Dot.prototype.createObject = function(x, y){
  var element = this.element = new PIXI.Graphics();
  var x = x + 50;
  var y = y + 50;
  var color = this.generateColor();

  element.moveTo(x, y);
  element.beginFill(color);
  element.lineStyle(1, color, 0.5);
  element.drawCircle(x, y, this.defaultRadius);
  element.endFill();

  element.interactive = true;
  widthAndHeight = this.defaultRadius*2;
  element.hitArea = new PIXI.Rectangle(x - this.defaultRadius, y - this.defaultRadius, widthAndHeight, widthAndHeight);

  this.setupEvents(element);
  return this.element;
}

Dot.prototype.setupEvents = function(element){
  element.mousedown = element.touchstart = function(data){
    this.alpha = 0.5;

    this.mousemove = this.touchmove = this.mouseupoutsite = this.touchendoutsite = function(data){
      console.log(data.target);
    }

    this.mouseup = this.touchend = this.mouseupoutside = this.touchendoutside = function(data){
      this.mousemove = this.touchmove = null;
    }
  }
}

Dot.prototype.generateColor = function(){
  var chosenColor = Dot.Defaults.availableColors[randomTo(Dot.Defaults.availableColors.length)];
  return chosenColor;
}
;// Generate matrix of dots
DotMatrix = {
  dots: []
}

DotMatrix.start = function(){
  var matrix = [];
  for (var line = 0; line < DotMatrix.Defaults.numberOfLines; line++ ) {
    var row = [];

    for (var elPos = 0; elPos < DotMatrix.Defaults.elementsPerLine; elPos++) {
      var dotY = line * (Dot.Defaults.defaultRadius * 5);
      var dotX = elPos * (Dot.Defaults.defaultRadius * 5);
      var dot = new Dot(dotX, dotY);
      row.push(dot);

      // Keep record of the dots
      dot.matrixPos = {
        y: line,
        x: elPos
      }
      this.dots.push(dot);

      stage.addChild(dot.element);
    }

    matrix.push(row);
  }

  return matrix;
}

DotMatrix.Defaults = {
  numberOfLines: 10,
  elementsPerLine: 6
}

;var DotsController = {
  hoveredDots: [],
  userPoints: 0,
  timeLeft: 60
}

DotsController.start = function(){
  DotMatrix.start();
  this.watchEvents(DotMatrix.dots);
}

DotsController.watchEvents = function(dots) {
  for (i in dots) {
    var dot = dots[i];
  }
}
;// Stage setup
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
}

requestAnimFrame(animate);
