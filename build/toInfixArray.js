const toInfixArray = (input) => {
    const arr = [];
    let str = "";
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if ("+-*÷()^%!√π".includes(char)) {
            if (char == "(") {
                count++;
            }
            if (char == ")") {
                count--;
            }
            if ("+*÷(^%!√".includes(input[i]) && "+*÷^)%".includes(input[i + 1])) {
                return "Invalid Expression";
            }
            else {
                if (str.length > 0) {
                    arr.push(str);
                    str = "";
                }
            }
            // Handle unary negative numbers explicitly
            if (char === "-" && (i === 0 || "+-*/÷(^%!√π".includes(input[i - 1]))) {
                arr.push("0"); // Add a leading 0 for unary negatives
            }
            arr.push(char);
        }
        else {
            str += char;
        }
    }
    if (str.length > 0) {
        arr.push(str);
    }
    if (count !== 0) {
        return "Invalid Expression";
    }
    return arr;
};
export { toInfixArray };
