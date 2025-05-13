$(document).ready(function () {
    // Variablen
    let board = []
    let container = $("#chessBoard");
    let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let squareAlge = {}

    // Erstellung des Schachbrettes & Algebric Chess Notation
    for (let row = 0; row < 8; row++) {
        let rank = 8 - row;
        board[row] = [];
        for (let col = 0; col < 8; col++) {
            let file = files[col];
            let squareName = file + rank;
            board[row][col] = { name: squareName, row: row, col: col };

            let square = document.createElement("div");
            square.classList.add("square");

            let dark = (row + col) % 2 === 1;
            square.style.backgroundColor = dark ? "#4d3737" : "burlywood";
            square.id = squareName;
            square.dataset.row = row;
            square.dataset.col = col;

            square.addEventListener("click", function () {
                console.log(squareName);
            });

            container.append(square);
        }
    }

    // Zugriff auf einzelne Felder mit der Algebranotation
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let squareName = board[row][col].name;
            squareAlge[squareName] = container.children()[row * 8 + col];
        }
    }

    // Piece placement
    function placePiece(piece, positionID, color) {
        let squarePosition = $("#" + positionID);
        let iconPiece = $(document.createElement("i"));
        iconPiece.addClass(`piece piece-${piece} fa-${color} fa-lemon fa-4x`);
        iconPiece.attr("id", `piece-${positionID}`);
        squarePosition.append(iconPiece);
    }

    // Starting Position
    function startingPosition() {
        // White Pices
        placePiece("rook", "a1", "regular");
        placePiece("knight", "b1", "regular");
        placePiece("bishop", "c1", "regular");
        placePiece("queen", "d1", "regular");
        placePiece("king", "e1", "regular");
        placePiece("bishop", "f1", "regular");
        placePiece("knight", "g1", "regular");
        placePiece("rook", "h1", "regular");
        placePiece("pawn", "a2", "regular");
        placePiece("pawn", "b2", "regular");
        placePiece("pawn", "c2", "regular");
        placePiece("pawn", "d2", "regular");
        placePiece("pawn", "e2", "regular");
        placePiece("pawn", "f2", "regular");
        placePiece("pawn", "g2", "regular");
        placePiece("pawn", "h2", "regular");

        // Black Pices
        placePiece("rook", "a8", "solid");
        placePiece("knight", "b8", "solid");
        placePiece("bishop", "c8", "solid");
        placePiece("queen", "d8", "solid");
        placePiece("king", "e8", "solid");
        placePiece("bishop", "f8", "solid");
        placePiece("knight", "g8", "solid");
        placePiece("rook", "h8", "solid");
        placePiece("pawn", "a7", "solid");
        placePiece("pawn", "b7", "solid");
        placePiece("pawn", "c7", "solid");
        placePiece("pawn", "d7", "solid");
        placePiece("pawn", "e7", "solid");
        placePiece("pawn", "f7", "solid");
        placePiece("pawn", "g7", "solid");
        placePiece("pawn", "h7", "solid");
    }

    // Figuren Bewegen
    let selectedPiece = undefined;
    let selectedColor = undefined;

    function pieceInteraction() {
        $(".square").on("click", function () {
            let piece = $(this).find(".piece").first();
            let hasPiece = piece.length > 0;
            let blackPiece = $(this).find(".piece-solid").length > 0;
            let whitePiece = $(this).find(".piece-regular").length > 0;
            let color = blackPiece ? "black" : (whitePiece ? "white" : undefined);

            if (hasPiece) {
                // Piece gets selected

                if (selectedPiece === undefined) {
                    selectedPiece = piece;
                    selectedColor = color;
                    $(this).addClass("selectedSquare");
                } else if (piece.is(selectedPiece)) {
                    // same piece clicked (deselect)
                    $(this).removeClass("selectedSquare");
                    selectedPiece = undefined;
                    selectedColor = undefined;
                } else if (selectedColor === color) {
                    // piece of same color clicked (select new piece)
                    $(selectedPiece.parent()).removeClass("selectedSquare");
                    $(this).addClass("selectedSquare");
                    selectedPiece = piece;
                } else {
                    // piece of other color, gets eaten
                    $(selectedPiece.parent()).removeClass("selectedSquare");
                    $(this).empty(); // Remove the opponent's piece
                    $(this).append(selectedPiece); // Move the selected piece to the target
                    $(this).parent().removeClass("selectedSquare");
                    selectedPiece = undefined;
                    selectedColor = undefined;
                }
            } else {
                // Destination is clicked
                if (selectedPiece !== undefined) {
                    $(selectedPiece.parent()).removeClass("selectedSquare");
                    $(this).append(selectedPiece); // Move the piece
                    selectedPiece = undefined;
                    selectedColor = undefined;
                }
            }
        });
    }

    function startGame() {
        pieceInteraction();
        startingPosition();
    }
    startGame();
});
