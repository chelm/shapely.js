shapely = {};

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

shapely.buffer = function( coords, distance, res ){

}
shapely.geom = function( coords, type ){

  var type = type;
  var coords = coords; 

  var geom = {
    area: area,
    length: length,
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
    return shapely.area( coords, type );
  }

  function length(){
    return 0.0;
  }

  function buffer( distance, res ){
    return shapely.buffer( coords, distance, res );
  }

  return geom;
};
shapely.point = function( coords ){
  var type = 'point';
  var shape = shapely.geom( coords, type );
  return shape;
}
shapely.polygon = function( coords ){
  var type = 'polygon';
  var shape = shapely.geom( coords, type );
  return shape;
}
//return shapely;})();
