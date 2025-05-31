let columnNames = "abcdefgh";

function drawChessBoard() {
  for (let row = 0; row < 8; row++) {
    let rowNumber = 8 - row;
    for (let column = 0; column < 8; column++) {
      let columnLetter = columnNames[column];
      let id = columnLetter + rowNumber;
      let element = $(document.createElement("div"));
      if ((row + column) % 2 === 0) {
        $(element).addClass("white");
      } else {
        $(element).addClass("black");
      }
      $(element).addClass("field")
      $("#chessBoard").append(element);
      $(element).attr("id", id);
    }
  }
}

function algebraicToCoords(square) {
  let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let file = square[0];           // e.g. "a"
  let rank = parseInt(square[1]); // e.g. "1" → 1

  let col = files.indexOf(file);  // "a" → 0, "b" → 1, etc.
  let row = 8 - rank;             // "1" → 7, "8" → 0 (top-down)

  return [row, col];              // [row, col]
}


let chessBoardArray = [
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]
];




function placePiece(piece, positionId, color) {
  let positionField = $("#" + positionId);
  let figure = $(document.createElement("i"));
  $(figure).addClass(`fa-solid fa-chess-${piece} figure-sizing `);
  $(figure).addClass("chess-piece")
  $(figure).addClass(`chess-piece-${color}`)
  $(figure).attr("id", `figure-${positionId}`)
  positionField.append(figure);


  let coords = algebraicToCoords(positionId);
  chessBoardArray[coords[0]][coords[1]] = piece;
}
console.log(chessBoardArray);
function figureSizing(denominator) {
  let chessBoardWidth = parseFloat($("#chessBoard").css("width"));
  let relativeFigureSize = chessBoardWidth / denominator;
  $("i.figure-sizing").css("font-size", relativeFigureSize);
}

function startingPositionsBlack() {
  placePiece("rook", "a8", "black");
  placePiece("rook", "h8", "black");
  placePiece("knight", "b8", "black");
  placePiece("knight", "g8", "black");
  placePiece("bishop", "c8", "black");
  placePiece("bishop", "f8", "black");
  placePiece("queen", "d8", "black");
  placePiece("king", "e8", "black");
  placePiece("pawn", "a7", "black");
  placePiece("pawn", "b7", "black");
  placePiece("pawn", "c7", "black");
  placePiece("pawn", "d7", "black");
  placePiece("pawn", "e7", "black");
  placePiece("pawn", "f7", "black");
  placePiece("pawn", "g7", "black");
  placePiece("pawn", "h7", "black");
}

function startingPositionsWhite() {
  placePiece("rook", "a1", "white");
  placePiece("rook", "h1", "white");
  placePiece("knight", "b1", "white");
  placePiece("knight", "g1", "white");
  placePiece("bishop", "c1", "white");
  placePiece("bishop", "f1", "white");
  placePiece("queen", "d1", "white");
  placePiece("king", "e1", "white");
  placePiece("pawn", "a2", "white");
  placePiece("pawn", "b2", "white");
  placePiece("pawn", "c2", "white");
  placePiece("pawn", "d2", "white");
  placePiece("pawn", "e2", "white");
  placePiece("pawn", "f2", "white");
  placePiece("pawn", "g2", "white");
  placePiece("pawn", "h2", "white");
}

function startingPositions() {
  startingPositionsBlack();
  startingPositionsWhite();
}

function removePiece(piece, positionId) {
  $(`#${positionId} i.fa-chess-${piece}`).remove();
}

function changeChessBoardArray(origin, destination) {
  chessBoardArray[arrayOrigin[0]][arrayOrigin[1]] = "";
}

let selectedPiece = undefined;
let selectedColor = undefined;
let origin = undefined;
let destination = undefined;
let arrayOrigin = undefined;
let arrayDestination = undefined;
let originalSelectedPiece = undefined;
let currentSelectedPiece = undefined;


function clickHandler() {
  $("#chessBoard > .field").on("click", function (event) {
    let chessPiece = $(this).find(".chess-piece").first()
    let hasChessPiece = chessPiece.length > 0
    let isChessPieceWhite = $(this).has(".chess-piece-white").length > 0
    let isChessPieceBlack = $(this).has(".chess-piece-black").length > 0
    let color = isChessPieceWhite ? "white" : (isChessPieceBlack ? "black" : undefined)
    
    console.log("*************** BEFORE ************")
    console.log("hasChessPiece", hasChessPiece)
    console.log("isChessPieceWhite", isChessPieceWhite)
    console.log("isChessPieceBlack", isChessPieceBlack)
    console.log("color", color)
    console.log("selectedPiece", selectedPiece)
    console.log("selectedColor", selectedColor)

    if (hasChessPiece) {
      // $(chessPiece).addClass("clickedFigure")
      
      if (selectedPiece === undefined) {
        // No piece selected, clicked on chess piece
        selectedPiece = chessPiece
        selectedColor = color
        $(this).addClass("selectedField")
      } else {
        if (selectedPiece.attr("id") === chessPiece.attr("id")) {
          // when clicked on selectedPiece
          // $(chessPiece).removeClass("clickedFigure")
          $(this).removeClass("selectedField")
          selectedPiece = undefined
          selectedColor = undefined
        } else if (selectedColor === color) {
          // Piece already selected but of same color; we select the new piece
          // $(selectedPiece).removeClass("clickedFigure")
          // $(chessPiece).addClass("clickedFigure")
          $(selectedPiece.parent()).removeClass("selectedField")
          $(this).addClass("selectedField")
          selectedPiece = chessPiece
        } else {
          // Piece already selected but of the other color, we eat the piece
          $(selectedPiece.parent()).removeClass("selectedField")
          $(this).empty()
          $(this).append(selectedPiece)
          $(this).parent().removeClass("selectedField")
          selectedPiece = undefined;
          selectedColor = undefined;
          // $(selectedPiece).removeClass("clickedFigure")
          
        }
      }
    } else {
      // Clicked on an empty field and a piece is already selected
      if (selectedPiece !== undefined) {
        origin = $(selectedPiece.parent().attr("id"));
        originalSelectedPiece = selectedPiece;
        $(selectedPiece.parent()).removeClass("selectedField")
        $(this).append(selectedPiece);
        destination = $(this.attr("id"));
        selectedPiece = undefined;
        selectedColor = undefined;
        arrayOrigin = algebraicToCoords(origin);
        arrayDestination = algebraicToCoords(destination);
        currentSelectedPiece = selectedPiece

        
      } 
      // if (selectedPiece === undefined) {
      //   $(selectedPiece.parent()).removeClass("selectedField")
      // }
    }
    console.log("*************** AFTER ************")
    console.log("selectedPiece", selectedPiece)
    console.log("selectedColor", selectedColor)


  })
}

function updateArray(origin, destination) {

}


function nextMove(figureId) {
  if (figureId === "figure-a1") {
  }

}




function playGame() {
  drawChessBoard();
  startingPositions();
  figureSizing(12);
  clickHandler();
}
playGame();



// no piece selected -> select piece (/)   ok
// piece selected of color x and selecting empty field => move (/)   ok
// piece selected of color x and selecting another piece of color x => select new piece
// piece selected of color x and selecting another piece of color y => move already selected piece and remove piece of color y


