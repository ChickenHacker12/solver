export default function findVariables(exp) {
  return math.parse(exp).filter(node => node.isSymbolNode);
}

function findFirstVariable(variables) {
  return variables[0].name;
}
