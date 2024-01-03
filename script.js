import HistoryManager from "./js/history_manager.js";
import MathJax from "mathjax/es5/startup.js";

MathJax = {
  loader: { load: ["input/asciimath", "output/chtml", "ui/menu", "ui/lazy"] }
};

lucide.createIcons();

const options = {
  output: {
    exactFractions: true,
    showDescriptions: true
  },
  stringOutput: {
    parenthesis: "auto",
    implicit: "hide"
  }
};

let history = [];
let historyManager = new HistoryManager();

let inputBox = document.getElementById("input-box");
let submitBtn = document.getElementById("submit-btn");
let outputBox = document.getElementById("output");
let historyBox = document.getElementById("history-box");


const action = "differentiate";
submitBtn.onclick = () => {
  console.log(window);
  let asciiInput = MathLive.convertLatexToAsciiMath(inputBox.value, "math");
  let question = {
    type: "Question",
    expression: renderExpression(asciiInput),
    time: new Date(),
    description: action
  };
  historyManager.addItem(question);
  renderHistoryItem(question);

  renderOutput(calc(asciiInput, action));

  // history.forEach(renderHistoryItem);
  MathJax.typeset([historyBox]);
};

function calc(input, action = "evaluate") {
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
}
function renderExpression(rawExp, delimiter = "`") {
  return delimiter + rawExp.toString(options.stringOutput) + delimiter;
}

function renderOutput(rawExp, delimiter = "`", description = "This is the solution:") {
  let expression = renderExpression(rawExp);
  let answer = {
    type: "Answer",
    expression,
    time: new Date(),
    description
  };
  historyManager.addItem(answer);
  renderHistoryItem(answer);
}

function renderHistoryItem(item) {
  historyBox.innerHTML += `<li class="list-group-item"><small>${item.type}</small>
  <p>${options.output.showDescriptions ? item.description : ""}</p>
  <p>${item.expression}</p>
  </li>`;
  scrollDown();
}

function scrollDown() {
  // scrollTo(0, (inputBox.getBoundingClientRect()).top);
  inputBox.scrollIntoView();
}
