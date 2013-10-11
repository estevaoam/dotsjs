/*
 * DotsController controls
 * the flow of the game.
 * (or something like that)
*/
var DotsController = {
  connectedDots: [],
  userPoints: 0,
  timeLeft: 60,
  isMouseDown: false,
  pointsPool: 0
}

DotsController.start = function(){
  DotMatrix.start();
}

/*
 * DotsController.hoverDot() is triggered
 * when the mouse are clicked and
 * receive the dot that it's over
*/
DotsController.hoverDot = function(dot) {
  if(dot.connected) { return true; };

  var length = this.connectedDots.length;

  if (length == 0 || dot.canConnect(this.connectedDots[length - 1])) {
    dot.connected = true;
    this.connectedDots.push(dot);
  }
}

DotsController.releaseDots = function(){
  for (i in DotsController.connectedDots) {
    var dot = DotsController.connectedDots[i];

    if (DotsController.connectedDots.length > 1) {
      DotMatrix.releaseDot(dot);
    }

    dot.connected = false;
  }


  DotMatrix.repopulate();
  DotsController.connectedDots = [];
}

DotsController.onMouseDown = function(event) {
  DotsController.isMouseDown = true;
}

DotsController.onMouseUp = function(event) {
  DotsController.isMouseDown = false;
  DotsController.releaseDots();
}

DotsController.onTouchDown = DotsController.onMouseDown;

$(document).on('mousedown', DotsController.onMouseDown);
$(document).on('mouseup', DotsController.onMouseUp);
$(document).on('touchdown', DotsController.onTouchDown);
$(document).on('touchup', DotsController.onTouchUp);
