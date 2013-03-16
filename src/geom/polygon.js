shapely.polygon = function( coords ){
  var type = 'polygon';
  var shape = shapely.geom( coords, type );
  return shape;
}
