import { options } from "./index.js";

// @param {unknown} input
// @param {string} action
export default function calculate(input, action) {
  try {
    let output;
    switch (action) {
      case "simplify":
        output = math.simplify(
          input,
          {},
          {
            exactFractions: options.output.exactFractions,
            context: math.simplify.realContext
          }
        );
        break;
      case "rationalize":
        output = math.rationalize(input);
        break;
      case "differentiate":
        output = math.derivative(input, "x");
        break;
      default:
        output = math.evaluate(input);
    }

    return output;
  } catch (e) {
    return e;
  }
}
