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
