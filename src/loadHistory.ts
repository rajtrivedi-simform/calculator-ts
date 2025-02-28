import { operation } from "./constants.js";
import { histObj } from "./types.js";

const degToRad = () => {
  const result = <HTMLInputElement>document.querySelector("#inputCalc");
  let num: number = 0,
    charset: string = "";

  for (const ele of result.value) {
    if (parseInt(ele) >= 0 && parseInt(ele) <= 9) {
      num = num * 10 + parseInt(ele);
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

//History Portion
// Add Node to History
const addNode = (child: HTMLElement) => {
  const parent = <HTMLElement>child.parentNode!.parentNode;
  const eqn: string =
    parent.querySelector(".equation")?.getAttribute("data-value") || "";
  const res: string =
    parent.querySelector(".result")?.getAttribute("data-value") || "";
  const history: Array<histObj> =
    JSON.parse(<string>localStorage.getItem("history")) || [];

  if (existHistory(eqn, res) && history.length > 0) {
    alert("History already exists!");
  } else {
    history.push({ equation: eqn, result: res });
    try {
      localStorage.setItem("history", JSON.stringify(history));
      child.remove();
      alert("History Added!");
    } catch (e) {
      alert("Error saving history:" + e);
    }
  }
};

// Remove Node from history
const removeElement = (child: HTMLElement) => {
  const parent = <HTMLElement>child.parentNode!.parentNode;
  const equation =
    parent.querySelector(".equation")?.getAttribute("data-value") || "";
  const result =
    parent.querySelector(".result")?.getAttribute("data-value") || "";

  if (existHistory(equation, result)) {
    const history: Array<histObj> = JSON.parse(
      <string>localStorage.getItem("history")
    );
    history.forEach((obj) => {
      if (obj.equation == equation && obj.result == result) {
        history.splice(history.indexOf(obj), 1);
        parent.remove();
      }
    });

    try {
      localStorage.setItem("history", JSON.stringify(history));
      alert("History Removed!");
    } catch (e) {
      alert("Error removing history:" + e);
    }
  } else {
    parent.remove();
  }
};

// Load input to display from history node
const loadtoinp = function (child: HTMLElement) {
  const equation = child.dataset.value;
  const input = <HTMLInputElement>document.querySelector("#inputCalc");
  input.value += equation ?? "";
};

const existHistory = (eqn: string, res: string, count: number = 0): boolean => {
  const history: Array<histObj> =
    JSON.parse(<string>localStorage.getItem("history")) || [];

  if (history.length > 0) {
    history.forEach((obj) => {
      if (obj.equation == eqn && obj.result == res) {
        count++;
      }
    });
  }
  return count > 0 ? true : false;
};

// Fetch and Load History
const fetchHistory = () => {
  try {
    const data: Array<histObj> = JSON.parse(localStorage.getItem("history")!) ?? [];
    loadHistory(data);
    maniHistory();
  } catch (e) {
    alert("Error fetching history:" + e);
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

//event handlers to manipulate history
const maniHistory = () => {
  const equationDiv = document.querySelectorAll(".equation");
  const delBTN = document.querySelectorAll(".fa-trash");
  const addNodeBTN = document.querySelectorAll(".fa-plus");

  //event listeners for history block
  addNodeBTN.forEach((element) => {
    element.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      addNode(target);
    });
  });
  delBTN.forEach((element) => {
    element.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      removeElement(target);
      maniHistory();
    });
  });
  equationDiv.forEach((elemnt) =>
    elemnt.addEventListener("click", (event: Event) => {
      const target = <HTMLElement>event.target;
      if (target.matches(".equation")) {
        loadtoinp(target);
      }
    })
  );
};

export { degToRad, fetchHistory, maniHistory, existHistory };
