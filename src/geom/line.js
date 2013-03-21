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
