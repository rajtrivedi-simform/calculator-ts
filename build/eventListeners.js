import { calculate } from "./index.js";
import { literals, unaryOperatorsEvent } from "./constants.js";
const eventListeners = () => {
    const buttonsList = document.querySelectorAll(".button");
    const input = document.querySelector("input");
    const result = document.querySelector(".result");
    const history = document.querySelector(".history-container");
    const histClearBtn = document.querySelector(".hist-clear");
    const second = document.querySelector(".second");
    //toggle functions for managing UI Mode
    function lightMode() {
        document.body.style.backgroundColor = "white";
        I.classList.remove("fa-moon");
        I.classList.add("fa-circle-half-stroke");
        document.querySelector("nav").style.color = "black";
        document.querySelector("nav").style.borderBottom = "5px solid black";
    }
    function darkmode() {
        document.body.style.backgroundColor = "#4b5563";
        I.classList.remove("fa-circle-half-stroke");
        I.classList.add("fa-moon");
        document.querySelector("nav").style.color = "white";
        document.querySelector("nav").style.borderBottom = "5px solid white";
    } //end
    const uiToggle = document.querySelector(".ui-toggle");
    const I = document.querySelector(".fa-moon");
    uiToggle.addEventListener("click", () => {
        I.classList.value.includes("fa-moon") ? lightMode() : darkmode();
    });
    buttonsList.forEach((button) => button.addEventListener("click", () => {
        if (unaryOperatorsEvent.includes(button.dataset.value)) {
            input.value += button.dataset.value + "(";
        }
        else {
            switch (button.dataset.value) {
                case "clear":
                    input.value = "";
                    result.innerHTML = "";
                    break;
                case "√":
                    input.value += `√`;
                    break;
                case "inv":
                    input.value = `1÷` + input.value;
                    break;
                case "powx":
                    input.value += "10^";
                    break;
                case "Delete":
                    while (input.value.length > 0 &&
                        input.value[input.value.length - 1].match(/[a-z(]/)) {
                        input.value = input.value.slice(0, -1);
                    }
                    if (input.value.length > 0) {
                        input.value = input.value.slice(0, -1);
                    }
                    result.innerHTML = "";
                    break;
                case "pow2":
                    input.value += "^2";
                    break;
                default:
                    input.value += button.dataset.value;
                    break;
            }
        }
    }));
    second.addEventListener("click", () => {
        console.log("Click");
        const inverseButtons = document.querySelectorAll(".secondary");
        inverseButtons.forEach((button) => {
            button.classList.contains("inactive")
                ? button.classList.remove("inactive")
                : button.classList.add("inactive");
        });
    });
    histClearBtn.addEventListener("click", () => {
        history.innerHTML = "";
        localStorage.clear();
        alert("History Cleared");
    });
    document.addEventListener("keydown", (event) => {
        if (literals.includes(event.key)) {
            input.value += event.key == "/" ? "÷" : event.key;
        }
        else if (event.key == "Backspace") {
            while (input.value.length > 0 &&
                input.value[input.value.length - 1].match(/[a-z(]/)) {
                input.value = input.value.slice(0, -1);
            }
            if (input.value.length > 0) {
                input.value = input.value.slice(0, -1);
            }
            result.innerHTML = "";
        }
        else if (event.key === "Enter") {
            calculate();
        }
    });
};
export { eventListeners };
