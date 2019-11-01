var gameBoard = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: ""
};

const gameFncs = (() {
  const switchPlayer = () => {
    if (currentPlayer === player1){
      currentPlayer = player2
    }
    else {
      currentPlayer = player1
    }

  }

})()

const personFactory = (name, marker) => {
  return { name, marker };
};


var player1 = personFactory("Player1", "X")
var player2 = personFactory("Player2", "O")
var currentPlayer = player1;



container = document.getElementById("tictacbox");
Object.entries(gameBoard).forEach(entry => {
  var box = document.createElement("DIV");
  box.classList.add("symbol-box");
  box.setAttribute("id", entry[0]);
  box.addEventListener("click", function(){
    playerTurn("X", entry[0])
  });
  var symbol = document.createTextNode(entry[1]);
  box.appendChild(symbol);
  container.appendChild(box);
});

function playerTurn(marker, id) {
  box = document.getElementById(id);
  currentText = box.textContent;
  if (currentText === "") {
    symbol = document.createTextNode(marker);
    box.appendChild(symbol);
  }
}
