require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("shapely.buffer");

suite.addBatch({
  "can buffer a point": {
    topic: function() {
      return shapely.point( [0, 0] ).buffer( 5 );
    },
    "is a polygon": function( buffer ) {
      assert.equal(buffer.type, 'Polygon');
    }
  },
  "can buffer a line":{
    topic: function(){
      return shapely.line( [[ -104, 40 ], [ -104, 45 ], [ -104, 50 ]] ).buffer( 1 );
    },
    "is a polygon": function( buffer ){
      //console.log(buffer)
      assert.equal(buffer.type, 'Polygon');
    }
  }, 
  "can buffer a polygon":{
    topic: function(){
      return shapely.polygon( [[[ -100, 40 ], [ -105, 40 ], [ -105, 45 ], [ -100, 45] ]] ).buffer( 1 );
    },
    "is a polygon": function( buffer ){
      assert.equal(buffer.type, 'Polygon');
    }
  }
});

suite.export(module);
