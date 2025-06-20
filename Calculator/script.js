let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");
let addSub = document.getElementById("addSub");

let string = "";
let arr = Array.from(buttons);
arr.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.innerHTML === "=") {
            string = eval(string);
            input.value = string;
        }
        else if (e.target.innerHTML == "AC") {
            string = "";
            input.value = string;
        }
        else if (e.target.innerHTML == "DEL") {
            string = string.slice(0, -1);
            input.value = string;
        }
        else if (e.target.innerHTML == "%") {
            string = string / 100;
            input.value = string;
        }
        else if( e.target.innerHTML == "+/-") {
            if (string.startsWith("-")) {
                string = string.slice(1);
            } else {
                string = "-" + string;
            }
            input.value = string;
        }
        else if (e.target.innerHTML == "√") {
            let num = parseFloat(string);
            if (!isNaN(num)) {
                string = Math.sqrt(num).toString();
                input.value = string;
            } else {
                input.value = "Error";
            }
        }
        else if (e.target.innerHTML == "π") {
            string += Number(Math.PI.toFixed(4));
            input.value = string;
        }
        else if (e.target.innerHTML == "e") {
            string += Number(Math.E.toFixed(4));
            input.value = string;
        }
        else if (e.target.innerHTML == "x²") {
            let num = parseFloat(string);
            if (!isNaN(num)) {
                string = Math.pow(num, 2).toString();
                input.value = string;
            } else {
                input.value = "Error";
            }
        }
        else {
            string += e.target.innerHTML;
            input.value = string;
        }
    })
});