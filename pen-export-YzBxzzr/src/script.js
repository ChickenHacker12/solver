MathJax = {
  loader: { load: ["input/asciimath", "output/chtml", "ui/menu", "ui/lazy"] }
};

const options = {
  output: {
    exactFractions: true
  },
  stringOutput: {
    parenthesis: "auto",
    implicit: "hide"
  }
};

class HistoryManager {
  constructor() {
    this._history = [];
  }

  addItem(item) {
    this._history.push(item);
  }
}

let history = [];
let historyManager = new HistoryManager();

let inputBox = document.getElementById("input-box");
let submitBtn = document.getElementById("submit-btn");
let outputBox = document.getElementById("output");
let historyBox = document.getElementById("history-box");

submitBtn.onclick = () => {
  console.log(window);
  let asciiInput = MathLive.convertLatexToAsciiMath(inputBox.value, "math");
  let question = {
    type: "Question",
    expression: renderExpression(asciiInput),
    time: new Date()
  };
  historyManager.addItem(question);
  renderHistoryItem(question);

  renderOutput(calc(asciiInput, "differentiate"));

  // history.forEach(renderHistoryItem);
  MathJax.typeset([historyBox]);
};

function calc(input, mode = "evaluate") {
  let output;
  switch (mode) {
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

function renderOutput(rawExp, delimiter = "`") {
  let expression = renderExpression(rawExp);
  let answer = {
    type: "Answer",
    expression,
    time: new Date(),
    description: "This is the solution:"
  };
  historyManager.addItem(answer);
  renderHistoryItem(answer);
}

function renderHistoryItem(item) {
  historyBox.innerHTML += `<li class="list-group-item"><small>${item.type}</small>
  <p>${item.expression}</p>
  </li>`;
}
