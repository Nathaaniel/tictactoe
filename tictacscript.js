var gameBoard = {};

const gameFncs = (() => {
  const reset = () => {
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"].forEach(function(letter) {
      gameBoard[letter] = "";
    });
    gameFncs.winner = false;

    gameFncs.finished = false;

    currentPlayer = player1;

    drawIt();
  };

  const newGame = () => {
    var x = document.getElementById("names").elements;
    player1 = personFactory(x.player1.value, "X");
    player2 = personFactory(x.player2.value, "O");
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
  };

  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  var winner = false;

  var finished = false;

  const checkWin = () => {
    [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
      ["a", "d", "g"],
      ["b", "e", "h"],
      ["c", "f", "i"],
      ["a", "e", "i"],
      ["c", "e", "g"]
    ].forEach(function(args) {
      gameFncs.positionCheck.apply(null, args);
    });
    boardValues = Object.values(gameBoard);
    if (!boardValues.includes("")) {
      gameFncs.finished = true;
      drawingMessage = document.querySelector(".one");
      drawText = document.createTextNode("It's a draw!");
      drawingMessage.appendChild(drawText);
      drawingMessage = document.querySelector(".two");
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
        side = ".one";
      } else {
        side = ".two";
      }
      winningMessage = document.querySelector(side);
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
    newGame
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
