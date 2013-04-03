
shapely.envelope = function( geometry ){

  var minx = 0,
    miny = 0,
    maxx = 0,
    maxy = 0;

  var _envelope = {
    'Point': function(){
      return geometry;
    },
    'LineString': function() { 
      return bounds( geometry.coords );
    },
    'Polygon': function(){
      return bounds( geometry.coords[0] );
    }
  }

  function bounds( coords ){
    var len = coords.length;
    while ( len-- ){
      var c = coords[len];
      minx = ( c[0] < minx ) ? c[0] : minx; 
      miny = ( c[1] < miny ) ? c[1] : miny; 
      maxx = ( c[0] > maxx ) ? c[0] : maxx; 
      maxy = ( c[1] > maxy ) ? c[1] : maxy; 
    }
    return shapely.polygon([[ [minx, miny], [minx, maxy], [maxx, maxy], [maxx, miny] ]]);
  }

  return _envelope[ geometry.type ]( geometry.coords );

}
