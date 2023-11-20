let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementById('game-board').children[index].innerText = currentPlayer;
        
        if (checkForWin()) {
            document.getElementById('status-message').innerText = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (checkForTie()) {
            document.getElementById('status-message').innerText = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status-message').innerText = `Current player: ${currentPlayer}`;
        }
    }
}

function checkForWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

function checkForTie() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('status-message').innerText = '';
    
    const cells = document.getElementById('game-board').children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
}

// Dynamically create the game board cells
const gameBoardDiv = document.getElementById('game-board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => handleCellClick(i));
    gameBoardDiv.appendChild(cell);
}

// Initial status message
document.getElementById('status-message').innerText = `Current player: ${currentPlayer}`;
