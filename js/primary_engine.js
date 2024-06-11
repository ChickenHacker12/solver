import MathEngine from "./math_engine.js";
import { ComputeEngine } from "@cortex-js/compute-engine";

export default class PrimaryEngine extends MathEngine {
  constructor() {
    super();

    this.ce = new ComputeEngine();

    this.operations = {
      derivative: {
        description: "Find the derivative",
        operation: function(input) {
          console.log(this.ce.box(["D", this.ce.parse(input)]).evaluate().latex);
          return (this.ce.box(["D", this.ce.parse(input), "x"]).evaluate().latex);
        }.bind(this)
      }
    };

    this.metadata = {
      name: "Cortex",
      inputType: "MathJSON"
    };
  }
}
