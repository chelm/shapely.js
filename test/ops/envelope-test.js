require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("shapely.envelope");

suite.addBatch({
  "envelope of a point": {
    topic: function() {
      return shapely.point( [0, 0] ).envelope();
    },
    "is a point": function( envelope ) {
      assert.equal(envelope.type, 'Point');
    }
  },
  "envelope of a line": {
    topic: function() {
      return shapely.line( [ [ 0, 0 ], [ 2, 2 ], [ 4, 4 ] ] ).envelope();
    },
    "is a polygon": function( envelope ) {
      assert.equal(envelope.type, 'Polygon');
    },
    "has an area": function( envelope ){
      console.log(envelope.coords)
      assert.equal(envelope.area(), 16);
    }
  }
});

suite.export(module);
