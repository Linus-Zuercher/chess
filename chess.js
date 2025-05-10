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

function placePiece(piece, positionId, color) {
  let positionField = $("#" + positionId);
  let figure = $(document.createElement("i"));
  $(figure).addClass(`fa-solid fa-chess-${piece} figure-sizing `);
  $(figure).addClass("chess-piece")
  $(figure).addClass(`chess-piece-${color}`)
  $(figure).attr("id", `figure-${positionId}`)
  positionField.append(figure);
}

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

let selectedPiece = undefined;
let selectedColor = undefined;



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
        $(selectedPiece.parent()).removeClass("selectedField")
        $(this).append(selectedPiece);
        selectedPiece = undefined;
        selectedColor = undefined;
        
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

function nextMove(pieceType) {
  

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
