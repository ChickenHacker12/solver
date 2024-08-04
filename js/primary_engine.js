import MathEngine from "./math_engine.js";
import { ComputeEngine } from "@cortex-js/compute-engine";

export default class PrimaryEngine extends MathEngine {
  constructor() {
    super();

    this.ce = new ComputeEngine();

    const hypoReplaceRule = this.ce.rules([
      // [
      //   ["Divide", ["Add", ["Power", "ExponentialE", ["Negate", "x"]], ["Power", "ExponentialE", "x"]], 2],
      //   ["Cosh", "x"]
      // ],
      {
        match: ["Divide", 1, ["Tan", "_"]],
        replace: ["Cot", "_"]
      }

    ]);
    console.log(hypoReplaceRule);

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
          return (this.ce.box([this.ce.parse(input)]).evaluate().latex);
        }.bind(this)
      },
      integrate: {
        description: "Int",
        operation: function(input) {
          return (this.ce.box(["Integrate", this._parseInput(input), "x"]).simplify().latex);
        }.bind(this)
      },
      hypoReplace: {
        description: "Replace exponential functions with hyperbolic",
        operation: function(input) {
          console.log(input);
          return (this.ce.box([input]).replace(this.hypoReplaceRule).latex);
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
