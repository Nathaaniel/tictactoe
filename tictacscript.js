var gameBoard = {
  1: "X",
  2: "",
  3: "",
  4: "",
  5: "X",
  6: "",
  7: "",
  8: "O",
  9: "",
};

// const gameBoard = (() {
    
// })()

const personFactory = (name, marker) => {
  return { name, marker };
};

container = document.getElementById("tictacbox")
Object.values(gameBoard).forEach((value) => {
  var box = document.createElement("DIV")
  box.classList.add("symbol-box")
  var symbol = document.createTextNode(value)
  box.appendChild(symbol)
  container.appendChild(box);
})
