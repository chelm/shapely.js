require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("shapely.line");

suite.addBatch({
  "simple line feature has no area but does have length": {
    topic: function() {
      return shapely.line( [ [0, 0], [0, 5] ] );
    },
    "area": function( line ) {
      assert.equal(line.area(), 0.0);
    },
    "length": function( line ) {
      assert.deepEqual(line.length(), 5);
    }
  }
});

suite.export(module);
