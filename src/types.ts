interface obj {
  [key: string]: { [key: string]: number | string };
}

interface unaryObj {
  [key: string]: (number: number) => number;
}

interface binaryObj {
  [key: string]: (number1: number, number2: number) => number;
}

interface consObj {
  [key: string]: () => number;
}
interface histObj {
  equation: string;
  result: string;
}


export { obj, unaryObj, binaryObj, consObj, histObj };
