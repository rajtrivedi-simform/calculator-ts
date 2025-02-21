import { maniHistory } from "./loadHistory.js";

const resultBlock = <HTMLElement>document.querySelector(".result");
let historyBlock = <HTMLElement>document.querySelector(".history-container");

const toDom = (result: number, equation: string) => {
  resultBlock.innerHTML = String(result);
  toHistory(String(result), equation);
  maniHistory();
};

const toHistory = (result: string, equation: string) => {
  historyBlock.innerHTML += `
  <div class="item">
    <div class="title" style="display:flex;">
      <div class="equation" data-value="${equation}">${equation}</div>
      <i class="fa-solid fa-trash" id="deleteBTN"></i>
    </div>
    <div class="content" style="display:flex;">
    <div class="result" data-value="${result}">${result}</div>
    <i class="fa-solid fa-plus"></i>
    </div>
  </div>
  `;
};

export { toDom };
