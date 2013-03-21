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
