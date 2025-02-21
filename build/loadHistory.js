import { operation } from "./constants.js";
let history = [];
const degToRad = () => {
    let result = document.querySelector("#inputCalc");
    let num = 0, charset = "";
    for (const ele of result.value) {
        if (parseInt(ele) >= 0 && parseInt(ele) <= 9) {
            num = (num * 10) + parseInt(ele);
        }
        else if (ele >= "a" && ele <= "z") {
            charset += ele;
        }
    }
    function radDeg(value) {
        return (value * Math.PI) / 180;
    }
    if (operation.includes(charset)) {
        result.value = charset + "(" + radDeg(num) + ")";
    }
};
const addNode = (child) => {
    var _a, _b;
    child = child.parentNode.parentNode;
    let eqn = ((_a = child.querySelector(".equation")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-value")) || "";
    history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
        equation: eqn,
        result: ((_b = child.querySelector(".result")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-value")) || "",
    });
    try {
        localStorage.setItem("history", JSON.stringify(history));
        child.querySelector(".fa-plus").style.display = "none";
        alert("History added");
    }
    catch (e) {
        alert("Error adding history" + e);
    }
};
const fetchHistory = () => {
    var _a;
    try {
        let data = (_a = JSON.parse(localStorage.getItem("history"))) !== null && _a !== void 0 ? _a : [];
        loadHistory(data);
        maniHistory();
    }
    catch (e) {
        alert("Error fetching history:" + e);
    }
};
const loadHistory = (data) => {
    const historyContainer = document.querySelector(".history-container");
    let html = "";
    data.forEach((node) => {
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
    historyContainer.innerHTML = html;
};
const maniHistory = () => {
    const equationDiv = document.querySelectorAll(".equation");
    const delBTN = document.querySelectorAll(".fa-trash");
    const addNodeBTN = document.querySelectorAll(".fa-plus");
    //event listeners for history block
    addNodeBTN.forEach(element => {
        element.addEventListener('click', (event) => {
            const target = event.target;
            addNode(target);
        });
    });
    delBTN.forEach(element => {
        element.addEventListener('click', (event) => {
            const target = event.target;
            removeElement(target);
            maniHistory();
        });
    });
    equationDiv.forEach(elemnt => elemnt.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches('.equation')) {
            // Check if the clicked element is a child of equationDiv
            loadtoinp(target);
        }
    }));
};
const loadtoinp = function (child) {
    let equation = child.dataset.value;
    let input = document.querySelector("#inputCalc");
    input.value = equation !== null && equation !== void 0 ? equation : "";
};
const removeElement = (child) => {
    history = JSON.parse(localStorage.getItem("history"));
    let parent = child.parentNode.parentNode;
    let equation = parent.querySelector(".equation").dataset.value;
    history.forEach((element) => {
        if (element.equation === equation) {
            history.splice(history.indexOf(element), 1);
        }
    });
    try {
        localStorage.setItem("history", JSON.stringify(history));
        alert("History removed");
        loadHistory(history);
    }
    catch (error) {
        alert(error);
    }
};
export { degToRad, fetchHistory, maniHistory };
