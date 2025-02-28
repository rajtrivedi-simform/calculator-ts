import { operation } from "./constants.js";
const degToRad = () => {
    const result = document.querySelector("#inputCalc");
    let num = 0, charset = "";
    for (const ele of result.value) {
        if (parseInt(ele) >= 0 && parseInt(ele) <= 9) {
            num = num * 10 + parseInt(ele);
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
//History Portion
// Add Node to History
const addNode = (child) => {
    var _a, _b;
    const parent = child.parentNode.parentNode;
    const eqn = ((_a = parent.querySelector(".equation")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-value")) || "";
    const res = ((_b = parent.querySelector(".result")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-value")) || "";
    const history = JSON.parse(localStorage.getItem("history")) || [];
    if (existHistory(eqn, res) && history.length > 0) {
        alert("History already exists!");
    }
    else {
        history.push({ equation: eqn, result: res });
        try {
            localStorage.setItem("history", JSON.stringify(history));
            child.remove();
            alert("History Added!");
        }
        catch (e) {
            alert("Error saving history:" + e);
        }
    }
};
// Remove Node from history
const removeElement = (child) => {
    var _a, _b;
    const parent = child.parentNode.parentNode;
    const equation = ((_a = parent.querySelector(".equation")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-value")) || "";
    const result = ((_b = parent.querySelector(".result")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-value")) || "";
    if (existHistory(equation, result)) {
        const history = JSON.parse(localStorage.getItem("history"));
        history.forEach((obj) => {
            if (obj.equation == equation && obj.result == result) {
                history.splice(history.indexOf(obj), 1);
                parent.remove();
            }
        });
        try {
            localStorage.setItem("history", JSON.stringify(history));
            alert("History Removed!");
        }
        catch (e) {
            alert("Error removing history:" + e);
        }
    }
    else {
        parent.remove();
    }
};
// Load input to display from history node
const loadtoinp = function (child) {
    const equation = child.dataset.value;
    const input = document.querySelector("#inputCalc");
    input.value += equation !== null && equation !== void 0 ? equation : "";
};
const existHistory = (eqn, res, count = 0) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
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
    var _a;
    try {
        const data = (_a = JSON.parse(localStorage.getItem("history"))) !== null && _a !== void 0 ? _a : [];
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
//event handlers to manipulate history
const maniHistory = () => {
    const equationDiv = document.querySelectorAll(".equation");
    const delBTN = document.querySelectorAll(".fa-trash");
    const addNodeBTN = document.querySelectorAll(".fa-plus");
    //event listeners for history block
    addNodeBTN.forEach((element) => {
        element.addEventListener("click", (event) => {
            const target = event.target;
            addNode(target);
        });
    });
    delBTN.forEach((element) => {
        element.addEventListener("click", (event) => {
            const target = event.target;
            removeElement(target);
            maniHistory();
        });
    });
    equationDiv.forEach((elemnt) => elemnt.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".equation")) {
            loadtoinp(target);
        }
    }));
};
export { degToRad, fetchHistory, maniHistory, existHistory };
