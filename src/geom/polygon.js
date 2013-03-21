shapely.polygon = function( coords ){

  // closed?
  var len = coords.length;
  if ( coords[len-1][0] != coords[0][0] || coords[len-1][1] != coords[0][1]) {
    coords.push([ coords[0][0], coords[0][1] ]);
  }

  var shape = shapely.geom( coords, 'polygon' );

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
