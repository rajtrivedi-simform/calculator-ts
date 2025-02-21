import { maniHistory } from "./loadHistory.js";
const resultBlock = document.querySelector(".result");
let historyBlock = document.querySelector(".history-container");
const toDom = (result, equation) => {
    resultBlock.innerHTML = String(result);
    toHistory(String(result), equation);
    maniHistory();
};
const toHistory = (result, equation) => {
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
