var Dot = function(x, y){
  this.defaultRadius = Dot.Defaults.defaultRadius;
  this.createObject(x, y);
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
Dot.prototype.createObject = function(x, y){
  var element = this.element = new PIXI.Graphics();
  var x = x + 50;
  var y = y + 50;
  var color = this.generateColor();
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
  var chosenColor = Dot.Defaults.availableColors[randomTo(Dot.Defaults.availableColors.length)];
  return chosenColor;
}

Dot.constructor = Dot;
