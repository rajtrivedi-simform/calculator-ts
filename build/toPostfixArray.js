import { prec } from "./constants.js";
const toPostfixArray = (input, max) => {
    const stack = [];
    const postfix = [];
    let maxx = max;
    if (maxx > input.length || maxx < 0) {
        maxx = input.length;
    }
    for (let i = 0; i < maxx; i++) {
        let token = input[i];
        // Handle negative numbers for power operations
        if (token === "-" &&
            (i === 0 ||
                prec[input[i - 1]] ||
                input[i - 1] === "(" ||
                input[i - 1] === "{")) {
            // Combine '-' with the next token to form a negative number
            if (i + 1 < maxx && typeof input[i + 1] === "number") {
                token = token + input[i + 1]; // e.g., '-3'
                i++; // Skip the next token as it's now part of the current token
            }
        }
        // Handle log_10 function
        if (token === "log_10") {
            stack.push(token);
        }
        else if (prec[token]) {
            while (stack.length > 0 &&
                stack[stack.length - 1] !== "log_10" && // Don't pop log_10 function
                ((prec[token].associativity === "left" &&
                    prec[token].precedence <= prec[stack[stack.length - 1]].precedence) ||
                    (prec[token].associativity === "right" &&
                        prec[token].precedence < prec[stack[stack.length - 1]].precedence))) {
                postfix.push(stack.pop());
            }
            stack.push(token);
        }
        else if (token === "(" || token === "{") {
            stack.push(token);
        }
        else if (token === ")" || token === "}") {
            while (stack.length > 0 &&
                stack[stack.length - 1] !== "(" &&
                stack[stack.length - 1] !== "{") {
                postfix.push(stack.pop());
            }
            stack.pop();
            // If we encounter a closing parenthesis and the top of the stack is log_10, add it to postfix
            if (stack.length > 0 && stack[stack.length - 1] === "log_10") {
                postfix.push(stack.pop());
            }
        }
        else {
            postfix.push(token);
        }
    }
    while (stack.length > 0) {
        postfix.push(stack.pop());
    }
    return postfix;
};
export { toPostfixArray };
