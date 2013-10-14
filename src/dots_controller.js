/*
 * DotsController controls
 * the flow of the game.
 * (or something like that)
*/
var DotsController = {
  connectedDots: [],
  lines: [],
  userPoints: 0,
  timeLeft: 60,
  isMouseDown: false,
  pointsPool: 0
}

DotsController.start = function(){
  DotMatrix.start();
  DotsController.renderPoints();
}

/*
 * DotsController.hoverDot() is triggered
 * when the mouse are clicked and
 * receive the dot that it's over
*/
DotsController.hoverDot = function(dot) {
  var length = this.connectedDots.length;

  if (length == 0 || dot.canConnect(this.connectedDots[length - 1])) {
    if (dot.connected !== true) {
      this.connectedDots.push(dot);
      dot.connected = true;
    } else {
      DotsController.increasePoints(1);
    }

    if (length > 0) {
      // Connects to the last dot
      dot.connectTo(this.connectedDots[length - 1]);
    }

    dot.animateHover();
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

  for (i in DotsController.lines) {
    var line = DotsController.lines[i];
    line.clear();
    stage.removeChild(line);
  }

  DotsController.lines = [];
  DotMatrix.repopulate();
  DotsController.connectedDots = [];
}

DotsController.increasePoints = function(number) {
  DotsController.userPoints = DotsController.userPoints + number;
  DotsController.renderPoints();
}

DotsController.decreasePoints = function(number) {
  DotsController.userPoints = DotsController.userPoints - number;
  DotsController.renderPoints();
}

DotsController.renderPoints = function() {
  if (DotsController._userPointsElement === undefined) {
    DotsController._userPointsElement = new PIXI.Text(DotsController.userPoints, { font: "16px Arial" });
    DotsController._userPointsElement.position = new PIXI.Point(10, 10);
    stage.addChild(DotsController._userPointsElement);
  } else {
    DotsController._userPointsElement.setText(DotsController.userPoints);
  }
}

DotsController.onMouseDown = function(event) {
  DotsController.isMouseDown = true;
}

DotsController.onMouseUp = function(event) {
  DotsController.isMouseDown = false;
  DotsController.releaseDots();
}

DotsController.onTouchDown = DotsController.onMouseDown;
DotsController.onTouchUp   = DotsController.onMouseUp;

$(document).on('mousedown', DotsController.onMouseDown);
$(document).on('mouseup', DotsController.onMouseUp);
$(document).on('touchdown', DotsController.onTouchDown);
$(document).on('touchup', DotsController.onTouchUp);
