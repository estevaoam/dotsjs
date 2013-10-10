var DotsController = {
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
