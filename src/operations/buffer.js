
shapely.buffer = function( geometry, distance, res ){

  var quadrants = 8;

  var buffer = {
    coords: []
  }

  if ( geometry.type == 'Point' ) {

      var pnt0 = [ geometry.coords[0] + distance, geometry.coords[1] ];
      buffer.coords.push( pnt0 );

      filletArc( geometry.coords, 0.0, 2.0 * Math.PI, -1);

      return shapely.polygon([buffer.coords]);

  } else {

  }


  function filletArc( pnt, angle0, angle1, direction) {

    var fullAngle = Math.abs( angle0 - angle1 );

    var nSegs = parseInt(( fullAngle / ( Math.PI / 2.0 / quadrants ) + 0.5));
    if ( nSegs < 1 ) return;

    var currentAngle = 0.0;

    while (currentAngle < fullAngle) {
      var angle = angle0 + direction * currentAngle;
      buffer.coords.push( [ pnt[0] + distance * Math.cos(angle), pnt[1] + distance * Math.sin(angle) ] );
      currentAngle += ( fullAngle / nSegs );
    }
    return; 
  }

}

/*  function filletReflex(p, p0, p1, direction, radius) {
    if (!(p1 instanceof jsts.geom.Coordinate)) {
      Fillet2.apply(this, arguments);
      return;
    }

    var dx0 = p0.x - p.x;
    var dy0 = p0.y - p.y;
    var startAngle = Math.atan2(dy0, dx0);
    var dx1 = p1.x - p.x;
    var dy1 = p1.y - p.y;
    var endAngle = Math.atan2(dy1, dx1);

    if (direction === jsts.algorithm.CGAlgorithms.CLOCKWISE) {
      if (startAngle <= endAngle)
        startAngle += 2.0 * Math.PI;
    } else { // direction == COUNTERCLOCKWISE
      if (startAngle >= endAngle)
        startAngle -= 2.0 * Math.PI;
    }
    this.segList.addPt(p0);
    this.addFillet(p, startAngle, endAngle, direction);
    this.segList.addPt(p1);
  };*/

