import { Calculator } from "./Calculator.js";
import { obj, unaryObj, binaryObj, consObj } from "./types";

const prec: obj = {
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

const operation: string[] = ["sin", "cos", "tan"];
const binaryOperators: string[] = ["÷", "*", "-", "+", "%", "^"];
const unaryOperatorsEvent: string[] = [
  "sin",
  "arcsin",
  "cos",
  "arccos",
  "tan",
  "arctan",
  "log",
  "log_10",
];
const unaryOperators: string[] = [
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

const constantOperators: string[] = ["π", "e"];

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
const binaryOperations: binaryObj = {
  "+": (number1: number, number2: number): number => calc.add(number1, number2),
  "-": (number1: number, number2: number): number =>
    calc.subtract(number1, number2),
  "*": (number1: number, number2: number): number =>
    calc.multiply(number1, number2),
  "÷": (number1: number, number2: number): number =>
    calc.divide(number1, number2),
  "%": (number1: number, number2: number): number =>
    calc.remainder(number1, number2),
  "^": (number1: number, number2: number): number => calc.pow(number1, number2),
};

const unaryOperations: unaryObj = {
  sin: (number: number): number => calc.sin(number),
  arcsin: (number: number): number => calc.arcsin(number),
  cos: (number: number): number => calc.cos(number),
  arccos: (number: number): number => calc.arccos(number),
  tan: (number: number): number => calc.tan(number),
  arctan: (number: number): number => calc.arctan(number),
  log: (number: number): number => calc.log(number),
  log_10: (number: number): number => calc.log10(number),
  "√": (number: number): number => calc.sqrt(number),
  "!": (number: number): number => calc.fact(number),
};

const constants: consObj = {
  π: (): number => calc.PI(),
  e: (): number => calc.e(),
};

export {
  operation,
  binaryOperators,
  unaryOperators,
  unaryOperatorsEvent,
  literals,
  binaryOperations,
  unaryOperations,
  prec,
  constants,
  constantOperators,
};
