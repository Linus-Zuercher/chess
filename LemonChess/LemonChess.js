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


    // Piece placement mit eigener Klasse je Figur
    function placePiece(piece, positionID, color) {
        let squarePosition = $("#" + positionID);
        let iconPiece = $(document.createElement("i"));

        let faColorClass = color === "regular" ? "fa-regular" : "fa-solid";
        let logicColorClass = color === "regular" ? "piece-regular" : "piece-solid";

        iconPiece.addClass(`piece ${logicColorClass} ${faColorClass} fa-lemon fa-4x piece-${piece}`);
        iconPiece.attr("id", `piece-${positionID}`);
        iconPiece.attr("data-piece", piece);

        squarePosition.append(iconPiece);
    }


    // Hilfsfunktion: Feldnamen in Koordinaten umwandeln
    function algebraicToCoords(square) {
        let files = ['a','b','c','d','e','f','g','h'];
        let file = square[0];
        let rank = parseInt(square[1]);
        let row = 8 - rank;
        let col = files.indexOf(file);
        return [row, col];
    }

    //KI not me
    // Zugvalidierung je Figur (vereinfacht)
    //KI not me
// Zugvalidierung je Figur (vereinfacht)
    function isValidMove(piece, origin, destination, color) {
        let [or, oc] = algebraicToCoords(origin);
        let [dr, dc] = algebraicToCoords(destination);
        let rowDiff = dr - or;
        let colDiff = dc - oc;

        switch(piece) {
            case "pawn":
                let forward = (color === "white") ? -1 : 1;
                let destinationSquare = $("#" + destination);
                let hasEnemyPiece = destinationSquare.find(".piece").length > 0 &&
                    ((color === "white" && destinationSquare.find(".piece-solid").length > 0) ||
                        (color === "black" && destinationSquare.find(".piece-regular").length > 0));

                // Vorwärts bewegen (1 Feld)
                if (colDiff === 0 && rowDiff === forward && !hasEnemyPiece) return true;

                // Vorwärts 2 Felder beim Start
                if (colDiff === 0 && rowDiff === 2*forward &&
                    ((color === "white" && or === 6) || (color === "black" && or === 1)) &&
                    !hasEnemyPiece) return true;

                // Seitwärts diagonal nur schlagen erlaubt
                if (Math.abs(colDiff) === 1 && rowDiff === forward && hasEnemyPiece) return true;

                return false;

            case "rook":
                if (rowDiff === 0 && colDiff !== 0) return true;
                if (colDiff === 0 && rowDiff !== 0) return true;
                return false;

            case "knight":
                if ((Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2)) return true;
                return false;

            case "bishop":
                if (Math.abs(rowDiff) === Math.abs(colDiff)) return true;
                return false;

            case "queen":
                if (rowDiff === 0 && colDiff !== 0) return true;
                if (colDiff === 0 && rowDiff !== 0) return true;
                if (Math.abs(rowDiff) === Math.abs(colDiff)) return true;
                return false;

            case "king":
                if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1) return true;
                return false;

            default:
                return false;
        }
    }

    //KI not me
    // Spielende prüfen (König verloren)
    function checkGameOver() {
        let whiteKing = $(".piece-regular.piece-king").length;
        let blackKing = $(".piece-solid.piece-king").length;

        if (whiteKing === 0) {
            alert("Schachmatt! Schwarz gewinnt!");
            $(".square").off("click");
            return true;
        } else if (blackKing === 0) {
            alert("Schachmatt! Weiß gewinnt!");
            $(".square").off("click");
            return true;
        }
        return false;
    }


    // Starting Position
    function startingPosition() {
        // White Pieces
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

        // Black Pieces
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


    // Figuren bewegen mit Zugprüfung + Märchenschach-Feature
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
                if (hasPiece) {
                    selectedPiece = pieceOnClicked;
                    selectedColor = color;
                    $(".square").removeClass("selectedSquare");
                    clickedSquare.addClass("selectedSquare");
                }
            } else {
                const originSquare = selectedPiece.parent();
                const originID = originSquare.attr("id");
                const destID = clickedSquare.attr("id");

                if (hasPiece) {
                    if (pieceOnClicked[0] === selectedPiece[0]) {
                        selectedPiece = undefined;
                        selectedColor = undefined;
                        $(".square").removeClass("selectedSquare");
                    } else if (color === selectedColor) {
                        selectedPiece = pieceOnClicked;
                        selectedColor = color;
                        $(".square").removeClass("selectedSquare");
                        clickedSquare.addClass("selectedSquare");
                    } else {
                        let pieceType = selectedPiece.data("piece");
                        if (isValidMove(pieceType, originID, destID, selectedColor)) {
                            pieceOnClicked.remove();
                            clickedSquare.append(selectedPiece);
                        } else {
                            selectedPiece.remove(); // Märchenschach: falscher Zug löscht Figur
                        }
                        $(".square").removeClass("selectedSquare");
                        selectedPiece = undefined;
                        selectedColor = undefined;
                    }
                } else {
                    let pieceType = selectedPiece.data("piece");
                    if (isValidMove(pieceType, originID, destID, selectedColor)) {
                        clickedSquare.append(selectedPiece);
                    } else {
                        selectedPiece.remove();
                    }
                    $(".square").removeClass("selectedSquare");
                    selectedPiece = undefined;
                    selectedColor = undefined;
                }
                checkGameOver();
            }
        });
    }


    function startGame() {
        startingPosition();
        pieceInteraction();
    }

    startGame();
});
