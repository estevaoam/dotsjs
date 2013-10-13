var Dot = function(x, y, color) {
  this.defaultRadius = Dot.Defaults.defaultRadius;
  this.createObject(x, y, color);
  return this;
}

/*
 * Default attributes for dots
*/
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

/*
 * Create the displayObject
 * of the dots.
*/
Dot.prototype.createObject = function(x, y, color){
  var element = this.element = new PIXI.Graphics();
  var x = x + 50;
  var y = y + 50;
  if (color === undefined) {
    var color = this.generateColor();
  }
  var widthAndHeight = this.defaultRadius*2;

  element.position.x = x;
  element.position.y = y;

  element.beginFill(color);
  element.lineStyle(1, color, 0.5);
  element.drawCircle(0, 0, this.defaultRadius);
  element.endFill();

  element.interactive = true;
  element.buttonMode = true;

  element.hitArea = new PIXI.Rectangle(-this.defaultRadius, -this.defaultRadius, widthAndHeight, widthAndHeight);

  this.setupEvents(element);
  return this.element;
}

Dot.cloneElement = function(dotElement) {
  var dot = new Dot(dotElement.position.x, dotElement.position.y, dotElement.lineColor);
  return dot.element;
}

Dot.prototype.updateHitArea = function() {
  var widthAndHeight = this.defaultRadius * 2;
  this.element.hitArea = new PIXI.Rectangle(-1*this.defaultRadius, -1*this.defaultRadius, widthAndHeight, widthAndHeight);
}

/*
 * Setup event handlers for mouseover
 * and mousedown.
*/
Dot.prototype.setupEvents = function(element){
  var _self = this;
  element.mouseover = function(data) {
    if (DotsController.isMouseDown === true) {
      DotsController.hoverDot(_self);
    }
  }

  element.mousedown = function(data) {
    DotsController.hoverDot(_self);
  }
}

/*
 * Check if a dot can connect to other
*/
Dot.prototype.canConnect = function(dot){
  var distance = 0.0;

  distance = Math.pow((dot.matrixPos.x - this.matrixPos.x), 2);
  distance = distance + Math.pow((dot.matrixPos.y - this.matrixPos.y), 2);
  distance = Math.sqrt(distance);

  return (distance <= 1.0 && dot.element.lineColor == this.element.lineColor);
}

Dot.prototype.release = function(){
  var element = this.element;

  var tweenAlpha = new TWEEN.Tween(element);
  tweenAlpha.to({ alpha: 0 }, 150);
  tweenAlpha.start();

  var tweenScale = new TWEEN.Tween(element.scale);

  tweenScale.to({ x: 0, y: 0 }, 150);
  tweenScale.onComplete(function(){
    this.clear;
    stage.removeChild(this);
  }.bind(element));
  tweenScale.start();
}

/*
 * Generate color for the dot
*/
Dot.prototype.generateColor = function(){
  var randomIndex = randomTo(Dot.Defaults.availableColors.length);
  var chosenColor = Dot.Defaults.availableColors[randomIndex];
  return chosenColor;
}

/*
 * Animate when hovering the dot
*/
Dot.prototype.animateHover = function(){
  var copyDot = Dot.cloneElement(this.element);
  copyDot.position = this.element.position.clone();
  copyDot.interactive = false;

  var tweenScale = new TWEEN.Tween(copyDot.scale);
  tweenScale.to({ x: 2, y: 2 }, 350);
  tweenScale.start();

  var tweenAlpha = new TWEEN.Tween(copyDot);
  tweenAlpha.to({ alpha: 0 }, 400);
  tweenAlpha.onComplete(function(){
    this.clear;
    stage.removeChild(this);
  }.bind(copyDot));
  tweenAlpha.start();

  stage.addChild(copyDot);
}

/*
 * Function to connect to another point.
 * Draws a line that connects all points.
*/
Dot.prototype.connectTo = function(dot) {
  this.drawLineTo(dot.element.position);
}

Dot.prototype.drawLineTo = function(point) {
  var x = point.x;
  var y = point.y;
  var line = this.line = new PIXI.Graphics();
  var color = this.element.lineColor;

  line.beginFill(color);
  line.lineStyle(this.defaultRadius/2, color);
  line.moveTo(this.element.position.x, this.element.position.y);
  line.lineTo(x, y);
  line.endFill();

  DotsController.lines.push(line);
  stage.addChild(line);
}

Dot.constructor = Dot;
