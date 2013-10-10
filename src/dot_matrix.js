// Generate matrix of dots
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

