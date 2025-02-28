import { maniHistory, existHistory } from "./loadHistory.js";

const resultBlock = <HTMLElement>document.querySelector(".result");
const historyBlock = <HTMLElement>document.querySelector(".history-container");

const toDom = (result: number, equation: string) => {
  resultBlock.innerHTML = String(result);
  toHistory(String(result), equation);
  maniHistory();
};

const existBlock = (equation: string,result: string,count: number = 0): boolean => {
  const items = historyBlock.querySelectorAll(".item");
  items.forEach((item) => {
    const eqn = item.querySelector(".equation")?.getAttribute("data-value");
    const res = item.querySelector(".result")?.getAttribute("data-value");

    console.log(eqn, res);
    if (eqn == equation && res == result) {
      count++;
    }
  });

  return count > 0 ? true : false;
};

const toHistory = (result: string, equation: string) => {
  const dec: boolean = existBlock(equation, result);
  if (dec || existHistory(equation, equation)) {
    return;
  } else {
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
