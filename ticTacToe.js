// Initialize game environment
var gameOn = true; // Set to true if game to start upon page loading
var numPlayers = 1;
var gridSize = 3;
var humanPlayer = 'playerX';
var computerPlayer = 'playerO';
var currentPlayer = 'playerX';
var winner = 'noWinner';
var computerLogic = 'max'
var numberOfTrials = 1000;
var scoreCurr = 1;
var scoreOther = 1;
var obstacles = false;

// Starts game over, used by other buttons
var resetGame = function() {
    gameOn = true;
    currentPlayer = humanPlayer;
    window.gameBoard = makeGameBoard(gridSize);
    // Add obstacles
    if (obstacles) {
        addObstacle(gameBoard, "cow");
    }
    if (numPlayers === 1 && currentPlayer === 'playerX') {
        placeRandom(gameBoard, computerPlayer);
    }
    renderGameBoard(gameBoard);
};


(function() {
    // Start an initial default game upon page loading
    window.gameBoard = makeGameBoard(3);
    placeRandom(gameBoard, computerPlayer);
    // addObstacle(gameBoard, "cow");  // Toggle to start default with obstacles

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

    // Restart game in Can't Lose mode
    document.getElementById('button-cantLose').onclick = function() {
        computerLogic = 'min';
        numberOfTrials = 1000;
        resetGame();
    };

    // Restart game in Easy mode
    document.getElementById('button-easy').onclick = function() {
        computerLogic = 'random';
        resetGame();
    };

    // Restart game in Medium mode
    document.getElementById('button-medium').onclick = function() {
        computerLogic = 'max';
        numberOfTrials = 8;
        resetGame();
    };

    // Restart game in Hard mode
    document.getElementById('button-hard').onclick = function() {
        computerLogic = 'max';
        numberOfTrials = 1000;
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
        renderGameBoard(gameBoard)
    };
     
    // Restart game with 5 X 5 grid, player mode is retained
    document.getElementById('button-grid5').onclick = function() {
        gridSize = 5;
        resetGame();
    };

    // Restart game with 5 X 5 grid, player mode is retained
    document.getElementById('button-grid6').onclick = function() {
        gridSize = 6;
        resetGame();
    };

    // Restart game with human player as pear
    document.getElementById('button-pear').onclick = function() {
        humanPlayer = 'playerX';
        computerPlayer = 'playerO';
        resetGame();
    };
    // Restart game with human player as pickle
    document.getElementById('button-pickle').onclick = function() {
        humanPlayer = 'playerO';
        computerPlayer = 'playerX';
        resetGame();
    };

    // Restart game with no obstacles
    document.getElementById('button-noObstacle').onclick = function() {
        obstacles = false;
        resetGame();
    };

    // Restart game with obstacles
    document.getElementById('button-obstacle').onclick = function() {
        obstacles = true;
        resetGame();
    };


    // Click handler for squares on board
    // Starts with the 1st human player move
    // Checks if there is a win
    // Then allows either the second player or computer player to move
    // Checks to see if there is a win
    window.clickHandler = function(positionArr) {
        if (gameOn) {
            // console.log(gameBoard) // test

            // Get board position of clicked square
            var row = positionArr[0];
            var col = positionArr[1];
            var filledSquare = false;
            var whileEmpty = true;

            // If game difficulty is hard and grid larger than 3x3
            // add cows

            // If there is not a gamePiece assigned to square, do:
            if (gameBoard[row][col].gamePiece === undefined) {
                // console.log("In the player 1 loop") // test

                // Make a gamePiece and render the Board
                makePiece(gameBoard, [row, col], currentPlayer);
                renderGameBoard(gameBoard);
                whileEmpty = false;
                
                // Check if 1st human player wins or tie
                // if so, alert and reset game
                winner = checkWin(gameBoard);
                // console.log("winner1:", winner)
                if (winner === currentPlayer || winner ==='tie') {
                    // console.log("winalert 1") // test
                    winAlert(winner);
                    gameOn = false;
                }

                if (gameOn) {
                    // If 1 player then:
                    // Check for empty squares and 
                    // Let computer choose at random
                    // Render game board
                    if (numPlayers === 1) {
                        if (getEmptySquares(gameBoard).length > 0 && gameOn) {
                            if (computerLogic === "random") {
                                placeRandom(gameBoard, computerPlayer);
                            } else {
                            // autoPlay(gameBoard, computerPlayer); // test - toglle to test autoPlay
                            monteCarlo(gameBoard, computerPlayer, numberOfTrials, computerLogic)
                            }
                        };
                        renderGameBoard(gameBoard); // test - toggle to test autoplay
                        winner = checkWin(gameBoard);
                        if (winner === computerPlayer || winner ==='tie') {
                            // console.log("winalert 2") // test
                            winAlert(winner);
                            gameOn = false;
                        }

                    // Else If 2 players then:
                    // Simply switch the current player for next loop
                    } else if (numPlayers === 2) {
                            currentPlayer = switchPlayer(currentPlayer);
                    }
                    // console.log("winner2:", winner) // test
                    // printBoard(gameBoard, 'player') // test
                    // console.log("gameBoard", gameBoard) // test
                }
            }
        }
    };
})();