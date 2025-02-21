class Calculator {
    constructor() {
        //  Methods for Binary Operations
        this.add = (number1, number2) => {
            return number1 + number2;
        };
        this.subtract = (number1, number2) => {
            return number1 - number2;
        };
        this.multiply = (number1, number2) => {
            return number1 * number2;
        };
        this.divide = (number1, number2) => {
            try {
                if (number2 == 0) {
                    throw "Division by zero not Possible";
                }
                else {
                    return number1 / number2;
                }
            }
            catch (error) {
                alert(error);
                return 0;
            }
        };
        this.remainder = (number1, number2) => {
            return number1 % number2;
        };
        this.pow = (number1, number2) => {
            return number1 ** number2;
        };
        //  method for unary operations
        this.sin = (number) => {
            return Math.sin(number);
        };
        this.arcsin = (number) => {
            return Math.asin(number);
        };
        this.cos = (number) => {
            return Math.cos(number);
        };
        this.arccos = (number) => {
            return Math.acos(number);
        };
        this.tan = (number) => {
            return Math.tan(number);
        };
        this.arctan = (number) => {
            return Math.atan(number);
        };
        this.log = (number) => {
            return Math.log(number);
        };
        this.log10 = (number) => {
            return Math.log10(number);
        };
        this.e = () => {
            return Math.E;
        };
        this.sqrt = (number) => {
            return Math.sqrt(number);
        };
        this.PI = () => {
            return Math.PI;
        };
        this.fact = (number) => {
            if (number == 0)
                return 1;
            else
                return number * this.fact(number - 1);
        };
    }
}
export { Calculator };
