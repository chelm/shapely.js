shapely.point = function( coords ){
  var type = 'point';
  var shape = shapely.geom( coords, type );
  return shape;
}
