require("../env");
//require("../../shapely");

console.log(shapely)

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("shapely.point");

suite.addBatch({
  "simple point feature has no area and no length": {
    topic: function() {
      return shapely.point( [0, 1] );
    },
    "area": function( point ) {
      console.log(point)
      assert.equal(point.area(), 0.0);
    },
    "length": function( point ) {
      assert.deepEqual(point.length(), 0.0);
    }
  }
});

suite.export(module);
