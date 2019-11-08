var gameBoard = {};

const gameFncs = (() => {
  const reset = () => {
    startLetters.forEach(function(letter) {
      gameBoard[letter] = "";
    });
    gameFncs.winner = false;

    gameFncs.finished = false;

    currentPlayer = player1;

    drawIt();
  };

  const startLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

  const newGame = () => {
    var x = document.getElementById("names").elements;
    player1 = personFactory(x.player1.value, "X");
    player2 = personFactory(x.player2.value, "O");
    gameFncs.gameType = x.AIselector.value;
    reset();
    var left = document.getElementById("player1");
    var right = document.getElementById("player2");
    while (left.firstChild) {
      left.removeChild(left.firstChild);
    }
    while (right.firstChild) {
      right.removeChild(right.firstChild);
    }
    var leftText = document.createTextNode(player1.name);
    var rightText = document.createTextNode(player2.name);
    left.appendChild(leftText);
    right.appendChild(rightText);
  };

  const drawIt = () => {
    container = document.getElementById("tictacbox");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    Object.entries(gameBoard).forEach(entry => {
      var box = document.createElement("DIV");
      box.classList.add("symbol-box");
      box.setAttribute("id", entry[0]);
      box.addEventListener("click", function() {
        playerTurn(currentPlayer.marker, entry[0]);
      });
      var symbol = document.createTextNode(entry[1]);
      box.appendChild(symbol);
      container.appendChild(box);
    });

    drawingMessage = document.getElementById("message-one");
    while (drawingMessage.firstChild) {
      drawingMessage.removeChild(drawingMessage.firstChild);
    }
    drawingMessage = document.getElementById("message-two");
    while (drawingMessage.firstChild) {
      drawingMessage.removeChild(drawingMessage.firstChild);
    }
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      if (gameFncs.gameType === "one-player" && gameFncs.finished === false;) {
        computerTurn();
      }
    } else {
      currentPlayer = player1;
    }
  };

  const computerTurn = () => {
    var available = Object.keys(gameBoard).filter(x => gameBoard[x] === "");
    var randomBox = available[Math.floor(Math.random()*available.length)];
    playerTurn(currentPlayer.marker, randomBox)
  };

  const playerSwitcher = () => {
    var twoPlayers = document.getElementById("two-player");
    var playerTwoBox = document.getElementById("secondPlayer");
    if (twoPlayers.checked == true) {
      playerTwoBox.value = "";
      playerTwoBox.removeAttribute("readonly");
      playerTwoBox.style.backgroundColor = "white";
    } else {
      playerTwoBox.value = "Computer";
      playerTwoBox.setAttribute("readonly", true);
      playerTwoBox.style.backgroundColor = "rgb(155, 155, 155)";
    }
  };

  var winner = false;

  var finished = false;

  var gameType = "";

  var winningCombos = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
    ["a", "d", "g"],
    ["b", "e", "h"],
    ["c", "f", "i"],
    ["a", "e", "i"],
    ["c", "e", "g"]
  ];

  const checkWin = () => {
    winningCombos.forEach(function(args) {
      gameFncs.positionCheck.apply(null, args);
    });
    boardValues = Object.values(gameBoard);
    if (!boardValues.includes("")) {
      gameFncs.finished = true;
      drawingMessage = document.getElementById("message-one");
      drawText = document.createTextNode("It's a draw!");
      drawingMessage.appendChild(drawText);
      drawingMessage = document.getElementById("message-two");
      drawText = document.createTextNode("It's a draw!");

      drawingMessage.appendChild(drawText);
    }
  };

  const positionCheck = (one, two, three) => {
    if (
      gameBoard[one] === gameBoard[two] &&
      gameBoard[three] === gameBoard[one] &&
      gameBoard[one] !== ""
    ) {
      gameFncs.finished = true;
      gameFncs.winner = currentPlayer.name;
      box1 = document.getElementById(one);
      box2 = document.getElementById(two);
      box3 = document.getElementById(three);
      box1.style.color = "red";
      box2.style.color = "red";
      box3.style.color = "red";
      console.log(gameFncs.winner + " wins!");
      if (currentPlayer === player1) {
        side = "message-one";
      } else {
        side = "message-two";
      }
      winningMessage = document.getElementById(side);
      winningText = document.createTextNode(
        "It's a win for " + gameFncs.winner
      );

      winningMessage.appendChild(winningText);
    }
  };

  return {
    switchPlayer,
    winner,
    finished,
    checkWin,
    positionCheck,
    reset,
    newGame,
    playerSwitcher,
    gameType
  };
})();

gameFncs.reset();

const personFactory = (name, marker) => {
  return { name, marker };
};

var player1 = personFactory("Player1", "X");
var player2 = personFactory("Player2", "O");
var currentPlayer = player1;

function playerTurn(marker, id) {
  box = document.getElementById(id);
  currentText = box.textContent;
  if (gameFncs.finished === true) {
    return;
  } else if (currentText === "") {
    gameBoard[id] = marker;
    symbol = document.createTextNode(marker);
    box.appendChild(symbol);
    gameFncs.checkWin();
    gameFncs.switchPlayer();
  }
}
