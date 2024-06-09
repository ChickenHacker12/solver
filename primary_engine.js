import MathEngine from "math_engine.js";

export default class PrimaryEngine extends MathEngine {
  constructor() {
    super();

    this.operations = {
      derivative: {
        description: "Find the derivative",
        function: function(input) {

        }
      }
    };

    this.metadata = {
      name: "Cortex",
      inputType: "MathJS"
    };
  }
}
