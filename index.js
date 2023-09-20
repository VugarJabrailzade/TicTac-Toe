const cells = document.querySelectorAll(".cell")
const result = document.querySelector("#resultText");
const restarBtn = document.querySelector("#restartBtn")

const condition = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

let option = ["","","","","","","","","",""];

let currentPlayer = "X"
let running = false;

startGame();
function startGame(){
    cells.forEach(cell => cell.addEventListener("click", clickCell));
    restarBtn.addEventListener("click", restartGame);
    result.textContent = `${currentPlayer}`
    running = true;
    
}

function clickCell(){
    const cellID = this.getAttribute("data-index");
    if(option[cellID] != "" || !running){
        return;
    }
    updateCell(this,cellID);
    checkWinner();
}

function updateCell (cell, index){
    option[index] = currentPlayer;
    cell.textContent = `${currentPlayer}`;
}

function changePlayer(){
    currentPlayer = (currentPlayer != "X") ? "X" : "O";
    result.textContent = currentPlayer;
    console.log(currentPlayer);
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < condition.length; i++){
        const secondCondition = condition[i];
        const cellA = option[secondCondition[0]];
        const cellB = option[secondCondition[1]];
        const cellC = option[secondCondition[2]];

        if( cellA == "" || cellB == "" || cellC == "" ){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        result.textContent = `${currentPlayer} Won`
        running = false
    }
    else if (!option.includes("")){
        result.textContent = "Draw!"
        running = false;
    }
    else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X"
    option = ["","","","","","","","",""];
    result.textContent = `${currentPlayer}`
    cells.forEach(cell =>  cell.textContent = ""); 
    running = true;
        
}