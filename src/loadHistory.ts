import { operation } from "./constants.js";
import { histObj } from "./types.js";

let history: Array<histObj> = [];

const degToRad = () => {
  let result = <HTMLInputElement> document.querySelector("#inputCalc");
  let num: number = 0, charset: string = "";

  for (const ele of result.value) {
    if (parseInt(ele) >= 0 && parseInt(ele) <= 9) {
      num = (num * 10) + parseInt(ele);
    } else if (ele >= "a" && ele <= "z") {
      charset += ele;
    }
  }

  function radDeg(value: number): number {
    return (value * Math.PI) / 180;
  }
  if (operation.includes(charset)) {
    result.value = charset + "(" + radDeg(num) + ")";
  }
};

const addNode = (child: HTMLElement) => {
  child = <HTMLElement> child.parentNode!.parentNode;
  let eqn = child.querySelector(".equation")?.getAttribute("data-value") || "";
  history = JSON.parse(<string>localStorage.getItem("history")) || [];
  history.push({
    equation: eqn,
    result: child.querySelector(".result")?.getAttribute("data-value") || "",
  });
  try {
    localStorage.setItem("history", JSON.stringify(history));
    (child.querySelector(".fa-plus") as HTMLElement).style.display = "none";
    alert("History added");
  } catch (e) {
    alert("Error adding history" + e);
  }
};

const fetchHistory = () => {
  try {
    let data: Array<histObj> = JSON.parse(localStorage.getItem("history")!) ?? [];
    loadHistory(data);
    maniHistory();
  } catch (e) {
    alert("Error fetching history:"+e);
  }
};

const loadHistory = (data: Array<histObj>) => {
  const historyContainer = document.querySelector(".history-container");
  let html = "";

  data.forEach((node: histObj) => {
    html += `  <div class="item">
                  <div class="title" style="display:flex;">
                    <div class="equation" data-value="${node.equation}">${node.equation}</div>
                    <i class="fa-solid fa-trash" id="deleteBTN"></i>
                  </div>
                  <div class="content" style="display:flex;">
                    <div class="result" data-value="${node.result}">${node.result}</div>
                  </div>
                </div>`;
  });
  (historyContainer as HTMLElement).innerHTML = html;
};

const maniHistory = () => {
  const equationDiv = document.querySelectorAll(".equation");
  const delBTN = document.querySelectorAll(".fa-trash")
  const addNodeBTN = document.querySelectorAll(".fa-plus");

  //event listeners for history block
  addNodeBTN.forEach(element => {
    element.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      addNode(target);
    });
  });
  delBTN.forEach(element => {
    element.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      removeElement(target);
      maniHistory()
    });
  });
  equationDiv.forEach(elemnt => elemnt.addEventListener("click", (event: Event) => {
    const target = <HTMLElement> event.target;
    if (target.matches('.equation')) {
      // Check if the clicked element is a child of equationDiv
      loadtoinp(target);
    }
  }));

}

const loadtoinp = function (child: HTMLElement) {
  let equation = child.dataset.value;
  let input = <HTMLInputElement>document.querySelector("#inputCalc");
  input.value = equation ?? "";
};

const removeElement = (child: HTMLElement) => {
  history = JSON.parse(<string>localStorage.getItem("history"));

  let parent = <HTMLElement>child.parentNode!.parentNode;
  let equation = (parent.querySelector(".equation") as HTMLElement)!.dataset.value;

  history.forEach((element) => {
    if (element.equation === equation) {
      history.splice(history.indexOf(element), 1);
    }
  });

  try {
    localStorage.setItem("history", JSON.stringify(history));
    alert("History removed");
    loadHistory(history);
  } catch (error) {
    alert(error);
  }
};

export {
  degToRad,
  fetchHistory,
  maniHistory
}