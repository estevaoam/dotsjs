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
  for (var line = 0; line < DotMatrix.Defaults.numberOfLines; line++ ) {
    var row = [];

    for (var elPos = 0; elPos < DotMatrix.Defaults.elementsPerLine; elPos++) {
      var dotY = line * (Dot.Defaults.defaultRadius * 5);
      var dotX = elPos * (Dot.Defaults.defaultRadius * 5);
      var dot = new Dot(dotX, dotY);
      row.push(dot);

      // Keep record of the dots
      // and it positions
      dot.matrixPos = {
        y: line,
        x: elPos
      }

      this.dots.push(dot);

      stage.addChild(dot.element);
    }

    this.matrix.push(row);
  }

  return this.matrix;
}

DotMatrix.releaseDot = function(dot){
  var x = dot.matrixPos.x;
  var y = dot.matrixPos.y;

  this.matrix[y][x] = dot.element.position.clone();
  stage.removeChild(dot.element);
}

/*
 * Repopulate empty spaces on the matrix
*/
DotMatrix.repopulate = function(){
  for (var y = this.matrix.length - 1; y >= 0; y--) {
    var line = this.matrix[y];

    for (var x = 0; x < line.length; x++) {
      var dot = line[x];

      if (dot !== undefined && dot.x !== undefined) {
        for (var c = y - 1; c >= 0; c--) {
          var upperDot = this.matrix[c][x];

          if (upperDot.x === undefined) {
            var tween = new TWEEN.Tween(upperDot.element.position)
                                 .to(dot.clone())
                                 .easing(TWEEN.Easing.Elastic.InOut);

            tween.onUpdate(function(d){
              upperDot.element.position.x = this.x;
              upperDot.element.position.y = this.y;
            }).start();

            this.matrix[y][x] = upperDot;
            this.matrix[c][x] = upperDot.element.position;
            break;
          }
        }
      }
    }
  }
}
