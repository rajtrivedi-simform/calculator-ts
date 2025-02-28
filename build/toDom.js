import { maniHistory, existHistory } from "./loadHistory.js";
const resultBlock = document.querySelector(".result");
const historyBlock = document.querySelector(".history-container");
const toDom = (result, equation) => {
    resultBlock.innerHTML = String(result);
    toHistory(String(result), equation);
    maniHistory();
};
const existBlock = (equation, result, count = 0) => {
    const items = historyBlock.querySelectorAll(".item");
    items.forEach((item) => {
        var _a, _b;
        const eqn = (_a = item.querySelector(".equation")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-value");
        const res = (_b = item.querySelector(".result")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-value");
        console.log(eqn, res);
        if (eqn == equation && res == result) {
            count++;
        }
    });
    return count > 0 ? true : false;
};
const toHistory = (result, equation) => {
    const dec = existBlock(equation, result);
    if (dec || existHistory(equation, equation)) {
        return;
    }
    else {
        historyBlock.innerHTML += `<div class="item">
        <div class="title" style="display:flex;">
          <div class="equation" data-value="${equation}">${equation}</div>
          <i class="fa-solid fa-trash" id="deleteBTN"></i>
        </div>
        <div class="content" style="display:flex;">
        <div class="result" data-value="${result}">${result}</div>
        <i class="fa-solid fa-plus"></i>
        </div>
      </div>`;
    }
};
export { toDom };
