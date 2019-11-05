var gameBoard = {};

const gameFncs = (() => {
  const reset = () => {
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"].forEach(function(letter) {
      gameBoard[letter] = "";
    });
    gameFncs.winner = false;

    gameFncs.finished = false;

    currentPlayer = player1;

    draw();
  };

  const draw = () => {
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
    }
  };

  return {
    switchPlayer,
    winner,
    finished,
    checkWin,
    positionCheck,
    reset
  };
})();

gameFncs.reset();

const personFactory = (name, marker) => {
  return { name, marker };
};

var player1 = personFactory("Player1", "X");
var player2 = personFactory("Player2", "O");
var currentPlayer = player1;

function test() {
  var x = document.getElementById("names").elements;
  player1 = personFactory(x[0], "X");
  player2 = personFactory(x[1], "O");
}

function playerTurn(marker, id) {
  box = document.getElementById(id);
  currentText = box.textContent;
  if (gameFncs.finished === true) {
    return;
  } else if (currentText === "") {
    gameBoard[id] = marker;
    symbol = document.createTextNode(marker);
    box.appendChild(symbol);
    gameFncs.switchPlayer();
    gameFncs.checkWin();
  }
}
