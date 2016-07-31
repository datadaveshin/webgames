// Initialize game environment
var gameOn = true; // Set to true if game to start upon page loading
var numPlayers = 1;
var gridSize = 3;
var humanPlayer = 'playerX';
var computerPlayer = 'playerO';
var currentPlayer = 'playerX';
var winner = 'noWinner'

// Starts game over, used by other buttons
var resetGame = function() {
    gameOn = true;
    currentPlayer = humanPlayer;
    window.gameBoard = makeGameBoard(gridSize);
    resetBoard(gameBoard);
    if (numPlayers === 1 && currentPlayer === 'playerX') {
        placeRandom(gameBoard, computerPlayer);
    }
    renderGameBoard(gameBoard);
};

(function() {
    // Start an initial default game upon page loading
    window.gameBoard = makeGameBoard(3);
    placeRandom(gameBoard, computerPlayer);

    // Restart game in 1 player mode
    document.getElementById('button-1player').onclick = function() {
        numPlayers = 1;
        resetGame();
    };
    
    // Restart game in 2 player mode
    document.getElementById('button-2player').onclick = function() {
        numPlayers = 2;
        resetGame();
    };

    // Restart game with 3 X 3 grid, player mode is retained
    document.getElementById('button-grid3').onclick = function() {
        gridSize = 3;
        resetGame();
    };
    
    // Restart game with 4 X 4 grid, player mode is retained
    document.getElementById('button-grid4').onclick = function() {
        gridSize = 4;
        resetGame();
    };
     
    // Restart game with 5 X 5 grid, player mode is retained
    document.getElementById('button-grid5').onclick = function() {
        gridSize = 5;
        resetGame();
    };

    // Restart game with human player as pear
    document.getElementById('button-pear').onclick = function() {
        humanPlayer = 'playerX'
        computerPlayer = 'playerO'
        resetGame();
    };
    // Restart game with human player as pickle
    document.getElementById('button-pickle').onclick = function() {
        humanPlayer = 'playerO'
        computerPlayer = 'playerX'
        resetGame();
    };

    // Click handler for squares on board
    // Starts with the 1st human player move
    // Checks if there is a win
    // Then allows either the second player or computer player to move
    // Checks to see if there is a win
    window.clickHandler = function(positionArr) {
        if (gameOn) {
            console.log(gameBoard) // test
            // Get board position of clicked square
            var row = positionArr[0];
            var col = positionArr[1];

            // If there is not a gamePiece assigned to square, do:
            if (!gameBoard[row][col].gamePiece) {
                // Make a gamePiece and render the Board
                makePiece(gameBoard, [row, col], currentPlayer);
                renderGameBoard(gameBoard);
                
                // Check if 1st human player wins or tie
                // if so, alert and reset game
                winner = checkWin(gameBoard);
                console.log("winner1:", winner)
                if (winner === currentPlayer || winner ==='tie') {
                    console.log("winalert 1")
                    winAlert(winner);
                    gameOn = false;
                }
            }
            if (gameOn) {
                // If 1 player then:
                // Check for empty squares and 
                // Let computer choose at random
                // Render game board
                if (numPlayers === 1) {
                    if (getEmptySquares(gameBoard).length > 0 && gameOn) {
                        placeRandom(gameBoard, computerPlayer);
                    };
                    renderGameBoard(gameBoard);
                    winner = checkWin(gameBoard);
                    if (winner === computerPlayer || winner ==='tie') {
                        console.log("winalert 2")
                        winAlert(winner);
                        gameOn = false;
                    }

                // Else If 2 players then:
                // Simply switch the current player for next loop
                } else if (numPlayers === 2) {
                        currentPlayer = switchPlayer(currentPlayer);
                }
                console.log("winner2:", winner)
            }
        }
    };
})();