
shapely.point = function( coords ){
  var shape = shapely.geom( coords, 'point' );

  shape.x = coords[0];
  shape.y = coords[1];

  return shape;
}
