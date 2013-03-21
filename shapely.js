shapely = {};
shapely.geom = function( coords, type ){

  var geom = {
    type: type,
    coords: coords,
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
    return 0.0;
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
  var shape = shapely.geom( coords, 'point' );
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

shapely.buffer = function( coords, type, distance, res ){

}
//return shapely;})();
