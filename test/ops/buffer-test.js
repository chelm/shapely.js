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
      assert.equal(buffer.type, 'polygon');
    }
  }
});

suite.export(module);
