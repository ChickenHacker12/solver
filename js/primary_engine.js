import MathEngine from "./math_engine.js";
import { ComputeEngine } from "@cortex-js/compute-engine";

export default class PrimaryEngine extends MathEngine {
  constructor() {
    super();

    this.ce = new ComputeEngine();

    this.hypoReplaceRule = this.ce.rules([
      {
        match: ["Divide", ["Add", ["Power", "ExponentialE", ["Negate", "x"]], ["Power", "ExponentialE", "x"]], 2],
        replace: ["Cosh", "x"]
      },
      {
        match: ["Divide", ["Subtract", ["Power", "ExponentialE", ["Negate", "x"]], ["Power", "ExponentialE", "x"]], 2],
        replace: ["Sinh", "x"]
      },
      {
        match: [ "Divide", [ "Add", ["Negate", ["Power", "ExponentialE", ["Negate", "x"]]], ["Power", "ExponentialE", "x"] ], [ "Add", ["Power", "ExponentialE", ["Negate", "x"]], ["Power", "ExponentialE", "x"]]],
        replace: ["Tanh", "x"]
      }
    ]);
    console.log(this.hypoReplaceRule);

    this.operations = {
      derivative: {
        description: "Find the derivative",
        operation: function(input) {
          console.log(this.ce.box(["D", input, "x"]).evaluate());
          return (this.ce.box(["D", input, "x"]).evaluate().latex);
        }.bind(this)
      },
      evaluate: {
        description: "Evaluate the expression",
        operation: function(input) {
          return (this.ce.box([input]).evaluate().latex);
        }.bind(this)
      },
      integrate: {
        description: "Int",
        operation: function(input) {
          return (this.ce.box(["Integrate", input, "x"]).simplify().latex);
        }.bind(this)
      },
      hypoReplace: {
        description: "Replace exponential functions with hyperbolic",
        operation: function(input) {
          console.log(input);
          try {

            let output = this.ce.box(input).replace(this.hypoReplaceRule, {once: false, recursive: true}).latex;
            return output;
          } catch (e) {
            console.error(e);
            return input.latex;
          }
        }.bind(this)
      }
    };

    this.metadata = {
      name: "Cortex",
      inputType: "MathJSON"
    };
  }

  parseInput(input) {
    console.info(`Parsing: ${input}`);
    return this.ce.parse(input);
  }
}
