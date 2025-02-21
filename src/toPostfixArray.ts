import { prec } from "./constants.js";

const toPostfixArray = (input: string[], max: number): string[] => {
  let stack: string[] = [];
  let postfix: string[] = [];
  let maxx: number = max;
  if (maxx > input.length || maxx < 0) {
    maxx = input.length;
  }

  for (let i: number = 0; i < maxx; i++) {
    let token: string | number = input[i];

    // Handle negative numbers for power operations
    if (
      token === "-" &&
      (i === 0 ||
        prec[input[i - 1]] ||
        input[i - 1] === "(" ||
        input[i - 1] === "{")
    ) {
      // Combine '-' with the next token to form a negative number
      if (i + 1 < maxx && typeof input[i + 1] === "number") {
        token = token + input[i + 1]; // e.g., '-3'
        i++; // Skip the next token as it's now part of the current token
      }
    }

    // Handle log_10 function
    if (token === "log_10") {
      stack.push(token as string);
    } else if (prec[token]) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== "log_10" && // Don't pop log_10 function
        ((prec[token].associativity === "left" &&
          prec[token].precedence <= prec[stack[stack.length - 1]].precedence) ||
          (prec[token].associativity === "right" &&
            prec[token].precedence < prec[stack[stack.length - 1]].precedence))
      ) {
        let temp = stack.pop();
        postfix.push(temp!);
      }
      stack.push(token as string);
    } else if (token === "(" || token === "{") {
      stack.push(token);
    } else if (token === ")" || token === "}") {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== "(" &&
        stack[stack.length - 1] !== "{"
      ) {
        let temp = stack.pop();
        postfix.push(temp!);
      }
      stack.pop();
      // If we encounter a closing parenthesis and the top of the stack is log_10, add it to postfix
      if (stack.length > 0 && stack[stack.length - 1] === "log_10") {
        postfix.push(stack.pop()!);
      }
    } else {
      postfix.push(token as string);
    }
  }

  while (stack.length > 0) {
    let temp = stack.pop();
    postfix.push(temp!);
  }

  return postfix;
};

export { toPostfixArray };