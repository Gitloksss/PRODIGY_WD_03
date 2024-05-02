let btnRef = document.querySelectorAll(".board-cell"); // Corrected class name
let popupRef = document.querySelector(".popup");
let newgameBtn = document.querySelector(".popup__restart-btn");
let restartBtn = document.querySelector(".game-restart-btn");
let msgRef = document.getElementById("message");
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];
//Player 'X' plays first
let xTurn = true;
let count = 0;
//Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
};
//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};
//This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};
//Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};
//New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
//Win Logic
const winChecker = () => {
    //Loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Check if elements are filled
        //If 3 empty elements are same and would give win as would
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                //If all 3 buttons have same values then pass the value to winFunction
                winFunction(element1);
            }
        }
    }
};
// Display X/O on click with color change and bigger size
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // Display X with color and bigger size
            element.innerText = "X";
            element.style.color = "#FF4081"; // Change color for X
            element.style.fontSize = "60px"; // Increase font size for X
            element.disabled = true;
        } else {
            xTurn = true;
            // Display O with color and bigger size
            element.innerText = "O";
            element.style.color = "#03A9F4"; // Change color for O
            element.style.fontSize = "60px"; // Increase font size for O
            element.disabled = true;
        }
        // Increment count on each click
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        // Check for win on every click
        winChecker();
    });
});
