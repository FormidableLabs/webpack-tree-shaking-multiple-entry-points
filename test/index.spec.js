"use strict";

const fs = require("fs");
const path = require("path");
const expect = require("chai").expect;

const ARRAY_DIST = path.join(__dirname, "../dist/array");
const MULTIPLE_ENTRIES_DIST = path.join(__dirname, "../dist/multiple-entries");

describe("multiple entries + tree shaking issues", () => {
  // EXPECT: PASS
  describe("array of configurations correctly eliminates unused code", () => {
    let app1;
    let app2;

    before((done) => {
      fs.readFile(path.join(ARRAY_DIST, "app1.js"), (err, data) => {
        if (err) { return done(err); }
        app1 = data.toString();

        fs.readFile(path.join(ARRAY_DIST, "app2.js"), (err, data) => {
          if (err) { return done(err); }
          app2 = data.toString();
          done();
        });

      });
    });

    it("app1 should drop blue, keep red", () => {
      expect(app1)
        .to.contain("/* unused harmony export blue */").and
        .to.contain("red = function")
    });

    it("app2 should drop red, keep blue", () => {
      expect(app2)
        .to.contain("/* unused harmony export red */").and
        .to.contain("blue = function")
    });
  });

  // NOTE: CURRENTLY FAILS
  describe("multiple entries should eliminate unused code (FAILS)", () => {
    let app1;
    let app2;

    before((done) => {
      fs.readFile(path.join(MULTIPLE_ENTRIES_DIST, "app1.js"), (err, data) => {
        if (err) { return done(err); }
        app1 = data.toString();

        fs.readFile(path.join(MULTIPLE_ENTRIES_DIST, "app2.js"), (err, data) => {
          if (err) { return done(err); }
          app2 = data.toString();
          done();
        });

      });
    });

    it("app1 should drop blue, keep red", () => {
      expect(app1)
        .to.contain("/* unused harmony export blue */").and
        .to.contain("red = function")
    });

    it("app2 should drop red, keep blue", () => {
      expect(app2)
        .to.contain("/* unused harmony export red */").and
        .to.contain("blue = function")
    });
  });

});
