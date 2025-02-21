class Calculator {
  //  Methods for Binary Operations
  add = (number1: number, number2: number): number => {
    return number1 + number2;
  };

  subtract = (number1: number, number2: number): number => {
    return number1 - number2;
  };

  multiply = (number1: number, number2: number): number => {
    return number1 * number2;
  };

  divide = (number1: number, number2: number): number => {
    try {
      if (number2 == 0) {
        throw "Division by zero not Possible";
      } else {
        return number1 / number2;
      }
    } catch (error) {
      alert(error);
      return 0;
    }
  };

  remainder = (number1: number, number2: number): number => {
    return number1 % number2;
  };

  pow = (number1: number, number2: number): number => {
    return number1 ** number2;
  };

  //  method for unary operations
  sin = (number: number): number => {
    return Math.sin(number);
  };

  arcsin = (number: number): number => {
    return Math.asin(number);
  };

  cos = (number: number): number => {
    return Math.cos(number);
  };

  arccos = (number: number): number => {
    return Math.acos(number);
  };

  tan = (number: number): number => {
    return Math.tan(number);
  };

  arctan = (number: number): number => {
    return Math.atan(number);
  };

  log = (number: number): number => {
    return Math.log(number);
  };

  log10 = (number: number): number => {
    return Math.log10(number);
  };

  e = (): number => {
    return Math.E;
  };

  sqrt = (number: number): number => {
    return Math.sqrt(number);
  };

  PI = (): number => {
    return Math.PI;
  };
  fact = (number: number): number => {
    if (number == 0) return 1;
    else return number * this.fact(number - 1);
  };
}

export { Calculator };
