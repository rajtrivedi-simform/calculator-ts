import { toInfixArray } from "./toInfixArray.js";
import { toPostfixArray } from "./toPostfixArray.js";
import { evalPostfix } from "./evalPostfix.js";
import { eventListeners } from "./eventListeners.js";
import { toDom } from "./toDom.js";
import { degToRad, fetchHistory} from "./loadHistory.js";

const calcButton = <HTMLElement>document.querySelector('.calc');
const degToRadBTN = <HTMLButtonElement>document.querySelector(".degToRad");
const alertHelper = (message: string) => {
  throw new Error(message);
};

const calculate = (): void => {
  const equation: string = (<HTMLInputElement>document.getElementById("inputCalc")).value;
  try {
    if (!equation || "+÷*%^!".includes(equation[0])) {
       // Condition to check if a equation starts with a operator or is empty
      !equation ? alertHelper("Please enter a equation") : alertHelper("Input should not start with operator");
    }
    const infixArray: string[] | string = toInfixArray(equation);
    if (typeof infixArray === "string"){
      alertHelper(infixArray);
      return;  // this will break the execution of the program in case of any error
    }
    const postfixArray: string[] = toPostfixArray(infixArray, infixArray.length);
    
    let result: number = evalPostfix(postfixArray)
    result = result == undefined ? eval(equation) : result;3
    toDom(result, equation);
  }
  catch (error) {
    alert(error);
    return;  // this will break the execution of the program in case of any error
  }
};

//invoking event handlers 
eventListeners();
//Loading History from Browser
fetchHistory();

//handling portions for calculations
calcButton.onclick = calculate;
degToRadBTN.onclick = degToRad;
//export handling
export { calculate };