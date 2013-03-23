
shapely.buffer = function( geometry, distance, res ){

  var quadrants = 8;

  var buffer = {
    coords: []
  }

  if ( geometry.type == 'Point' ) {

    if ( parseInt(distance) <= 0 ) return shapely.polygon([]); 
    
    var pnt0 = [ geometry.coords[0] + distance, geometry.coords[1] ];
    buffer.coords.push( pnt0 );
    filletArc( geometry.coords, 0.0, 2.0 * Math.PI, -1);
    return shapely.polygon([buffer.coords]);

  } else if ( geometry.type == 'LineString' ) {

    if ( parseInt(distance) <= 0 ) return shapely.polygon([]); 

    buffer.offsets = [];

    var nCoords = geometry.coords.length - 1;

    buffer.offsets.push( offset( [ geometry.coords[0], geometry.coords[1] ], 1) );

    for (var i = 2; i <= nCoords; i++) {
      segGen.addNextSegment( geometry.coords[i], true );
    }

//    segGen.addLastSegment();
    // add line cap for end of line
//    segGen.addLineEndCap(simp1[n1 - 1], simp1[n1]);
  
/*    // ---------- compute points for right side of line
    // Simplify the appropriate side of the line before generating
    var simp2 = jsts.operation.buffer.BufferInputLineSimplifier.simplify(
        inputPts, -distTol);
    // MD - used for testing only (to eliminate simplification)
    // Coordinate[] simp2 = inputPts;
    var n2 = simp2.length - 1;
  
    // since we are traversing line in opposite order, offset position is still
    // LEFT
    segGen.initSideSegments(simp2[n2], simp2[n2 - 1], jsts.geomgraph.Position.LEFT);
    for (var i = n2 - 2; i >= 0; i--) {
      segGen.addNextSegment(simp2[i], true);
    }
    segGen.addLastSegment();
    // add line cap for start of line
    segGen.addLineEndCap(simp2[1], simp2[0]);
  
    segGen.closeRing();*/


  } else if ( geometry.type == 'Polygon') {

  }

  function offset( segment, side ) {
    var offset = [ [], [] ]; 

    var side = side * -1,
      dx = segment[1][0] - segment[0][0],
      dy = segment[1][1] - segment[0][1];

    var len = Math.sqrt(dx * dx + dy * dy);
    var ux = side * distance * dx / len,
      uy = side * distance * dy / len;

    offset[0][0] = segment[0][0] - uy;
    offset[0][1] = segment[0][1] + ux;
    offset[1][0] = segment[1][0] - uy;
    offset[1][1] = segment[1][1] + ux;

    return offset;
};

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


  function filletReflex( pnt, pnt0, pnt1, direction ) {

    var dx0 = pnt0.x - pnt.x;
    var dy0 = pnt0.y - pnt.y;
    var startAngle = Math.atan2( dy0, dx0 );
    
    var dx1 = pnt1.x - pnt.x;
    var dy1 = pnt1.y - pnt.y;
    var endAngle = Math.atan2( dy1, dx1 );

    if ( direction === -1 ) {
      if ( startAngle <= endAngle )
        startAngle += 2.0 * Math.PI;
    } else {
      if ( startAngle >= endAngle )
        startAngle -= 2.0 * Math.PI;
    }

    buffer.coords.push( pnt0 );
    filletArc( pnt, startAngle, endAngle, direction );
    buffer.coords.push( pnt1 );

    return;
  };

}
