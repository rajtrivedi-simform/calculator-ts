import {
  unaryCalculate,
  binaryCalculate,
  constantCalculate,
} from "./calculate.js";
import {
  unaryOperators,
  binaryOperators,
  constantOperators,
} from "./constants.js";

// Evaluate postfix expression and return the result.
const evalPostfix = (postfixArray: string[]): number => {
  const stack: Array<number> = [];
  let result: number = 0;

  for (let i = 0; i < postfixArray.length; i++) {
    if (!isNaN(parseInt(postfixArray[i]))) {
      stack.push(parseFloat(postfixArray[i]));
    } else {
      if (binaryOperators.includes(postfixArray[i])) {
        result = binaryCalculate(stack[stack.length - 2],stack[stack.length - 1],postfixArray[i]);
        stack.pop();
        stack.pop();
        stack.push(result);
      } else if (unaryOperators.includes(postfixArray[i])) {
        result = unaryCalculate(stack[stack.length - 1], postfixArray[i]);
        stack.pop();
        stack.push(result);
      } else if (constantOperators.includes(postfixArray[i])) {
        result = constantCalculate(postfixArray[i]);
        stack.push(result);
      }
    }
  }
  if (stack.length == 1) {
    return stack[stack.length - 1];
  }
  return 0;
};

export { evalPostfix };
