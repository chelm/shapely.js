require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("shapely.polygon");

suite.addBatch({
  "simple polygon feature has area but no length": {
    topic: function() {
      return shapely.polygon( [[0, 5],[5, 5], [5, 0], [0, 0], [0, 5]] );
    },
    "area": function( poly ) {
      assert.equal(poly.area(), 25);
    },
    "length": function( poly ) {
      assert.deepEqual(poly.length(), 0.0);
    }
  }
});

suite.addBatch({
  "unclosed polygons get closed (first coord matches last)": {
    topic: function() {
      return shapely.polygon( [[0, 5],[5, 5], [5, 0], [0, 0]] );
    },
    "is closed": function( poly ) {
      assert.deepEqual( poly.coords[ poly.coords.length - 1 ], [0, 5] );
    }
  }
});

suite.export(module);
