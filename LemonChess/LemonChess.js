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
            square.classList.add("square");
            square.classList.add((row + col) % 2 === 1 ? "dark-square" : "light-square");
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

        // FontAwesome-Klasse bestimmen
        let faColorClass = color === "regular" ? "fa-regular" : "fa-solid";

        // Farbklasse für die Logik (damit .hasClass später funktioniert!)
        let logicColorClass = color === "regular" ? "piece-regular" : "piece-solid";

        iconPiece.addClass(`piece ${logicColorClass} ${faColorClass} fa-lemon fa-4x`);
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
            const clickedSquare = $(this);
            const pieceOnClicked = clickedSquare.find(".piece").first();

            const hasPiece = pieceOnClicked.length > 0;
            const isBlack = pieceOnClicked.hasClass("piece-solid");
            const isWhite = pieceOnClicked.hasClass("piece-regular");
            const color = isBlack ? "black" : isWhite ? "white" : undefined;

            if (selectedPiece === undefined) {
                // Erstmalig eine Figur wählen
                if (hasPiece) {
                    selectedPiece = pieceOnClicked;
                    selectedColor = color;
                    $(".square").removeClass("selectedSquare");
                    clickedSquare.addClass("selectedSquare");
                }
            } else {
                const originSquare = selectedPiece.parent();

                if (hasPiece) {
                    if (pieceOnClicked[0] === selectedPiece[0]) {
                        // Gleiche Figur erneut angeklickt – abwählen
                        selectedPiece = undefined;
                        selectedColor = undefined;
                        $(".square").removeClass("selectedSquare");
                    } else if (color === selectedColor) {
                        // Andere eigene Figur – Auswahl wechseln
                        selectedPiece = pieceOnClicked;
                        selectedColor = color;
                        $(".square").removeClass("selectedSquare");
                        clickedSquare.addClass("selectedSquare");
                    } else {
                        // Gegnerische Figur – schlagen
                        pieceOnClicked.remove(); // entferne Gegner
                        clickedSquare.append(selectedPiece); // ziehe eigene Figur hierher
                        $(".square").removeClass("selectedSquare");
                        selectedPiece = undefined;
                        selectedColor = undefined;
                    }
                } else {
                    // Freies Feld – bewegen
                    clickedSquare.append(selectedPiece);
                    $(".square").removeClass("selectedSquare");
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
