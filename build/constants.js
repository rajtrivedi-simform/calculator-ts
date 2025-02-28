import { Calculator } from "./Calculator.js";
const prec = {
    "+": { precedence: 1, associativity: "left" },
    "-": { precedence: 1, associativity: "left" },
    "*": { precedence: 2, associativity: "left" },
    "÷": { precedence: 2, associativity: "left" },
    "%": { precedence: 2, associativity: "left" },
    "^": { precedence: 3, associativity: "right" },
    "√": { precedence: 4, associativity: "right" },
    "!": { precedence: 4, associativity: "right" },
    sin: { precedence: 5, associativity: "right" },
    cos: { precedence: 5, associativity: "right" },
    tan: { precedence: 5, associativity: "right" },
    arcsin: { precedence: 5, associativity: "right" },
    arccos: { precedence: 5, associativity: "right" },
    arctan: { precedence: 5, associativity: "right" },
    log: { precedence: 5, associativity: "right" },
    log_10: { precedence: 5, associativity: "right" },
    "(": { precedence: 0 },
    "{": { precedence: 0 },
};
const operation = ["sin", "cos", "tan"];
const binaryOperators = ["÷", "*", "-", "+", "%", "^"];
const unaryOperatorsEvent = [
    "sin",
    "arcsin",
    "cos",
    "arccos",
    "tan",
    "arctan",
    "log",
    "log_10",
];
const unaryOperators = [
    "sin",
    "arcsin",
    "cos",
    "arccos",
    "tan",
    "arctan",
    "log",
    "log_10",
    "!",
    "√",
];
const constantOperators = ["π", "e"];
const literals = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "*",
    "/",
    "%",
];
const calc = new Calculator();
//operators maps to evaluate postfix
const binaryOperations = {
    "+": (number1, number2) => calc.add(number1, number2),
    "-": (number1, number2) => calc.subtract(number1, number2),
    "*": (number1, number2) => calc.multiply(number1, number2),
    "÷": (number1, number2) => calc.divide(number1, number2),
    "%": (number1, number2) => calc.remainder(number1, number2),
    "^": (number1, number2) => calc.pow(number1, number2),
};
const unaryOperations = {
    sin: (number) => calc.sin(number),
    arcsin: (number) => calc.arcsin(number),
    cos: (number) => calc.cos(number),
    arccos: (number) => calc.arccos(number),
    tan: (number) => calc.tan(number),
    arctan: (number) => calc.arctan(number),
    log: (number) => calc.log(number),
    log_10: (number) => calc.log10(number),
    "√": (number) => calc.sqrt(number),
    "!": (number) => calc.fact(number),
};
const constants = {
    π: () => calc.PI(),
    e: () => calc.e(),
};
export { operation, binaryOperators, unaryOperators, unaryOperatorsEvent, literals, binaryOperations, unaryOperations, prec, constants, constantOperators, };
