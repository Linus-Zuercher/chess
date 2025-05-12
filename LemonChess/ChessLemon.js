
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
            square.style.backgroundColor = dark ? "#769656" : "#eeeed2";
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

    // Pice placement
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

    // Startposition ausführen
    startingPosition();

    //Figuren Bewegen
    let selectedPiece = undefined;
    let selectedColor = undefined;

    function movePiece() {
        $("square").on("click", function (event) {
            let piece = $(this).find(".piece").first()
            let hasPiece = $(this).has(".piece").length > 0;
            let blackPiece = $(this).classList.contains("piece-solid").length > 0;
            let whitePiece = $(this).classList.contains("piece-regular").length > 0;
            let color = blackPiece ? "black" : (whitePiece ? "white" : undefined)

            if (hasPiece) {
            //$(".piece").addClass("clickedFigure")
                if (selectedPiece === undefined) {
                    // destination was clicked
                    selectedPiece = piece
                    selectedColor = color
                    $(this).addClass("selectedField")
                }
            }
        })
    }

    //Click erkennen / Figur erfassen (X)
    //Figur clas selected (X)
    //next click destination
});

