shapely = {};
shapely.geom = function( coords, type ){

  var geom = {
    type: type,
    coords: coords,
    area: area,
    length: length,
    geojson: geojson,
    buffer: buffer

    /*simplify: simplify,
    union: union,
    centroid: centroid,
    difference: difference,
    intersection: intersects,
    within: within,
    contains: contains,
    overlaps: overlaps,
    intersects: intersects,
    geojson: geojson,
    envelope: envelope*/

  }

  function area(){
    return 0.0;
  }

  function length(){
    return 0.0;
  }

  function buffer( distance, res ){
    return shapely.buffer( geom, distance, res );
  }

  function geojson( properties ){
    return { 
      geometry: {coordinates: coords, type: type },
      properties: properties
    }
  }

  return geom;
};

shapely.point = function( coords ){
  var shape = shapely.geom( coords, 'Point' );

  shape.x = coords[0];
  shape.y = coords[1];

  return shape;
}
shapely.line = function( coords ){

  var shape = shapely.geom( coords, 'line' );

  shape.length = function(){
    var len = 0;

    for (i = 1; i < coords.length; i++) {
      var p1 = coords[ i-1 ],
        p2 = coords[ i ];

      len += Math.sqrt( ( p2[0] -= p1[0] ) * p2[0] + ( p2[1] -= p1[1] ) * p2[1] );
    }

    return len; 
  }

  return shape;
}
shapely.polygon = function( coords ){

  // closed?
  var len = coords.length;
  if ( coords[len-1][0] != coords[0][0] || coords[len-1][1] != coords[0][1]) {
    coords.push([ coords[0][0], coords[0][1] ]);
  }

  var shape = shapely.geom( coords, 'Polygon' );

  shape.area = function( ){
    var area = 0,
      len = coords.length;
    var j = len - 1;

    for (i = 0; i < len; i++) {
      area += ( coords[j][0] + coords[i][0] ) * ( coords[j][1] - coords[i][1] );
      j = i;
    }

    return area / 2;
  }

  return shape;
}
// area is no longer used, instead the fn is hung directly 
// on the polygon since thats the only place its used
shapely.area = function( coords, type ){
  var _area = {
    point: function(){
      return 0.0;
    },
    line: function() { 
      return 0.0;
    },
    polygon: function( c ){
      var area = 0,
        len = c.length;
      var j = len - 1;
      
      for (i = 0; i < len; i++) {
        area +=  ( c[j][0] + c[i][0] ) * ( c[j][1]  -c[i][1] );
        j = i;
      }

      return area / 2;
    }
  }

  return _area[ type ]( coords );

}

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

//return shapely;})();
