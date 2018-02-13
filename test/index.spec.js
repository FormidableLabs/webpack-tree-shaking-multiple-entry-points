"use strict";

const path = require("path");
const pify = require("pify");
const fs = pify(require("fs"));
const expect = require("chai").expect;

// Gather all scenarios.
const builds = ["array", "multiple-entries"];
const scenarios = ["one-file", "re-export"];

describe("tree shaking in webpack4", () => {
  builds.forEach((build) => {
    describe(build, () => {
      scenarios.forEach((scenario) => {
        describe(scenario, () => {
          it("app1 should have red, not blue", () =>
            fs.readFile(path.join(__dirname, "../dist", build, scenario, "app1.js"))
              .then((src) => {
                expect(src.toString())
                  .to.contain("style=\"color: red\">").and
                  .to.not.contain("style=\"color: blue\">");
              })
          );

          it("app2 should have blue, not red", () =>
            fs.readFile(path.join(__dirname, "../dist", build, scenario, "app2.js"))
              .then((src) => {
                expect(src.toString())
                  .to.contain("style=\"color: blue\">").and
                  .to.not.contain("style=\"color: red\">");
              })
          );
        });
      });
    });
  });
});
