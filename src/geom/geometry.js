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
