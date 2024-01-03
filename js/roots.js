

export default function findPossibleRationalRoots(expression) {
  let polynomial = math.parse(expression);

  let possConstants = polynomial.filter((node) => {
    return node.isConstantNode;
  });

  return possConstants;
  // let isConstant = !math.isZero(possConstant);
}
