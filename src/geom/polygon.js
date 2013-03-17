shapely.polygon = function( coords ){
  var type = 'polygon';

  // is closed?
  var len = coords.length;
  if ( coords[len-1][0] != coords[0][0] || coords[len-1][1] != coords[0][1]) {
    coords.push([ coords[0][0], coords[0][1] ]);
  }

  var shape = shapely.geom( coords, type );
  return shape;
}
