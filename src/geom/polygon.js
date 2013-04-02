

shapely.polygon = function( coords ){
  // TODO add supposrt for multi geoms
  
  // closed?
  if ( coords[0] ) {
    var len = coords[0].length;
    if ( coords[0][len-1][0] != coords[0][0][0] || coords[0][len-1][1] != coords[0][0][1]) {
      coords[0].push(coords[0][0]);
    }
  }

  var shape = shapely.geom( coords, 'Polygon' );

  shape.area = function( ){
    var c = coords[0];
    var area = 0,
      len = c.length;
    var j = len - 1;

    for (i = 0; i < len; i++) {
      area += ( c[j][0] + c[i][0] ) * ( c[j][1] - c[i][1] );
      j = i;
    }

    return area / 2;
  }

  return shape;
}
