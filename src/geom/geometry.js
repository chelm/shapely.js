shapely.geom = function( coords, type ){

  var geom = {
    type: type,
    coords: coords,
    area: area,
    length: length,
    geojson: geojson,
    buffer: buffer,
    envelope: envelope

    /*simplify: simplify,
    union: union,
    centroid: centroid,
    difference: difference,
    intersection: intersection,
    within: within,
    contains: contains,
    overlaps: overlaps,
    intersects: intersects*/

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

  function envelope(){
    return shapely.envelope( geom );
  }

  return geom;
};
