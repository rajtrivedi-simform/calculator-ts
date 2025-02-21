import { binaryOperations, unaryOperations , constants} from "./constants.js";

const binaryCalculate = (number1:number, number2:number, operand:string):number  => {
    try {
      if (typeof number1 === "number" && typeof number2 === "number") {
        return binaryOperations[operand](number1, number2);
      } else {
        throw "Enter a valid Number";
      }
    } catch (error) {
      console.log(error);
    }
    return 0;
  };
  
const unaryCalculate = (number:number, operand:string):number => {
    return unaryOperations[operand](number);
  };

const constantCalculate = (operand:string):number => {
  return parseFloat(constants[operand]().toPrecision(3));
};
  
  export { unaryCalculate, binaryCalculate, constantCalculate};
  