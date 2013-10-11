// Generate matrix of dots
DotMatrix = {
  dots: [],
  matrix: []
}

DotMatrix.Defaults = {
  numberOfLines: 10,
  elementsPerLine: 6
}

// Start the matrix, generate it
// and deploy to stage.
DotMatrix.start = function(){
  for (var x = 0; x < DotMatrix.Defaults.elementsPerLine; x++ ) {
    this.matrix[x] = [];

    for (var y = 0; y < DotMatrix.Defaults.numberOfLines; y++) {

      var dotY = y * (Dot.Defaults.defaultRadius * 5);
      var dotX = x * (Dot.Defaults.defaultRadius * 5);
      var dot = new Dot(dotX, dotY);

      // Keep record of the dots
      // and it positions
      dot.matrixPos = {
        x: x,
        y: y
      }

      this.matrix[x][y] = dot;
      stage.addChild(dot.element);
    }
  }

  return this.matrix;
}

DotMatrix.releaseDot = function(dot){
  var x = dot.matrixPos.x;
  var y = dot.matrixPos.y;

  this.matrix[x][y] = dot.element.position.clone();
  dot.release();
}

/*
 * Repopulate empty spaces on the matrix
*/
DotMatrix.repopulate = function(){
  for (var x = 0; x < this.matrix.length; x++) {
    for (var y = (this.matrix[x].length - 1); y >= 0; y--) {
      var dot = this.matrix[x][y];

      if (dot !== undefined && dot.x !== undefined) {
        for (var c = y; c >= 0; c--) {
          if (this.matrix[x][c].x === undefined) {
            var upperDot = this.matrix[x][c];
            var tween = new TWEEN.Tween(upperDot.element.position)
                                 .to(dot.clone(), 500)
                                 .easing(TWEEN.Easing.Bounce.Out);

            tween.onUpdate(upperDot.updateHitArea.bind(upperDot));
            tween.start();

            upperDot.matrixPos = { x: x, y: y };

            this.matrix[x][c] = upperDot.element.position.clone();
            this.matrix[x][y] = upperDot;
            break;
          }
        }
      }
    }
  }
}
