import bootstrap from "bootstrap";
import { createIcons } from "lucide";
import HistoryManager from "./history_manager.js";
import calculate from "./calculate.js";
import findPossibleRationalRoots from "./roots.js";
import findVariables from "./find_variables.js";
import PrimaryEngine from "./primary_engine.js";
// import MathJax from "mathjax/es5/startup.js";
// let MathJax = require("mathjax/es5/startup.js");
window.MathJax = {
  loader: { load: ["input/asciimath", "output/chtml", "ui/menu", "ui/lazy"] }
};
// import MathJax from "mathjax/es5/startup.js";
// import "mathjax/es5/startup.js";
// require("mathjax/es5/startup.js");

lucide.createIcons();

const engine = new PrimaryEngine();
console.info(engine.getOperations());
console.log(engine.operations.derivative.operation("e^{5x}"));

export const options = {
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
let actionButtonBox = document.getElementById("action-button-box");
let cardBox = document.getElementById("card-box");
let keyboardBox = document.getElementById("keyboard-box");
mathVirtualKeyboard.container = keyboardBox;

mathVirtualKeyboard.addEventListener("geometrychange", () => {
  mathVirtualKeyboard.container.style.height = mathVirtualKeyboard.boundingRect.height + "px";
});

function generateActionButtons() {
  // let buttons = [
  // {
  //   action: "evaluate",
  //   description: "Evaluate"
  // }, {
  //   action: "simplify",
  //   description: "Simplify the expression"
  // }, {
  //   action: "rationalize",
  //   description: "Rationalize the expression"
  // },
  // {
  //   action: "differentiate",
  //   description: "Differentiate with repsect to x"
  // }];
  //
  // buttons.forEach((button) => {
  //   let btn = document.createElement("button");
  //   btn.className = "list-group-item list-group-item-action";
  //   btn.addEventListener("click", () => actionButtonClicked(operations[operation]));
  //   btn.setAttribute("data-bs-dismiss", "modal");
  //   btn.innerHTML = button.description;
  //   actionButtonBox.appendChild(btn);
  // });

  let operations = engine.getOperations();

  for (let operation in operations) {
    let btn = document.createElement("button");
    btn.className = "list-group-item list-group-item-action";
    btn.addEventListener("click", () => actionButtonClicked(operations[operation]));
    btn.setAttribute("data-bs-dismiss", "modal");
    btn.innerHTML = operations[operation].description;
    actionButtonBox.appendChild(btn);
  }


}

generateActionButtons();

const action = "differentiate";
submitBtn.onclick = () => {


};

function actionButtonClicked(action) {
  // let asciiInput = MathLive.convertLatexToAsciiMath(inputBox.value, "math");
  let question = {
    type: "Question",
    expression: inputBox.value,
    time: new Date(),
    description: action.description
  };
  historyManager.addItem(question);
  renderHistoryItem(question);

  // renderOutput(calculate(asciiInput, action));
  renderOutput(action.operation(question.expression));
  // console.info(action.operation(question.expression));

  // history.forEach(renderHistoryItem);
  // MathJax.typeset([historyBox]);
}

function renderExpression(rawExp, delimiter = "`") {
  return delimiter + rawExp.toString(options.stringOutput) + delimiter;
}

// function renderOutput(rawExp, delimiter = "`", description = "This is the solution:") {
//   // rawExp is an Object
//   rawExp = math.string(rawExp);
//   // console.info(rawExp);
//
//   let expression = MathLive.convertAsciiMathToLatex(rawExp);
//   let answer = {
//     type: "Answer",
//     expression,
//     time: new Date(),
//     description
//   };
//   historyManager.addItem(answer);
//   renderHistoryItem(answer);
// }

function renderOutput(object, delimiter = "`", description = "This is the solution:") {
  if (!object.name) {
    // let rawExp = object;
    // // rawExp is an Object
    // console.info(rawExp);
    // rawExp = math.string(rawExp);

    // let expression = MathLive.convertAsciiMathToLatex(rawExp);
    let expression = object;
    let answer = {
      type: "Answer",
      expression,
      time: new Date(),
      description
    };
    historyManager.addItem(answer);
    renderHistoryItem(answer);
  } else {
    let e = object;
    // Handle error
    let answer = {
      type: "Error",
      expression: `${e.name}: ${e.message}`,
      time: new Date(),
      description: "An error occurred when answering: "
    };
    historyManager.addItem(answer);
    renderHistoryItem(answer);

  }

}

function renderAnswer() {

}

function renderHistoryItem(item) {
  historyBox.innerHTML += `<li class="list-group-item"><small>${item.type}</small>
  <p>${options.output.showDescriptions ? item.description : ""}</p>
  <math-field readonly>${item.expression}</math-field>
  </li>`;
  scrollDown();
}

function scrollDown() {
  // scrollTo(0, (inputBox.getBoundingClientRect()).top);
  inputBox.scrollIntoView();
}
