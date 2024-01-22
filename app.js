const gameBoard = (function() {
  const columns = 3;
  const rows = 3;
  let boardSpaces = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => gridSpace())
  );

  const resetBoard = () => {
    boardSpaces = boardSpaces.map(row =>
      row.map(() => gridSpace())
    );
  };

  const addMoveToBoard = (player, positionX, positionY) => {
    const checkEmptySpace = boardSpaces[positionX][positionY].getValue();
    if (checkEmptySpace) {
      return;
    } else {
      boardSpaces[positionX][positionY].addPlayerToSpace(player);
    }
  };

  const getBoard = () => {
    const boardWithCellValues = boardSpaces.map((row) => row.map((gridSpace) => gridSpace.getValue()));
    return boardWithCellValues;
  };

  function gridSpace() {
    let gridValue = null;
    
    const getValue = () => gridValue;

    const addPlayerToSpace = (player) => gridValue = player;
  
    return { addPlayerToSpace, getValue };
  };

  return { addMoveToBoard, getBoard, resetBoard };
})();

const gameControl = (function() {

  let board = gameBoard;
  let players = [];
  let currentPlayer;

  function createPlayer (name, piece) {
    return { name, piece };
  }

  const addPlayersToGame = (playersData) => {
    players = playersData.map(player => createPlayer(player.name, player.piece));
    currentPlayer = players[0];
  }

  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  const playerTurn = (x, y) => {
    console.log(currentPlayer);
    board.addMoveToBoard(currentPlayer, x, y);

    let currentBoard = board.getBoard();
    console.log(currentBoard);

    if (checkWinner(currentBoard)) {
      let winner = currentPlayer.name;
      currentPlayer = players[0];
      return `${winner} Wins!`;
    } else if (checkTie(currentBoard)){
      currentPlayer = players[0];
      return `It's A Tie!`;
    } else {
      switchCurrentPlayer();
    }
  };

  function checkWinner (currentBoard) {
    //Returns true if all values in a line are equal (win)
    const checkAllEqual = arr => arr.every(val => val !== null && val === arr[0]);    

    for(let i = 0; i < currentBoard.length; i++){
      const column = (currentBoard, i) => currentBoard.map(x => x[i]);
      if (checkAllEqual(column(currentBoard, i)) || checkAllEqual(currentBoard[i])){
        return true; 
      }
    }
    //Return true if diagonal values equal
    function checkDiagonal(currentBoard, start, step) {
      if (checkAllEqual([currentBoard[start][0], currentBoard[start + step][1], currentBoard[start+step*2][2]])) {
        return true;
      }
    } 
    if (checkDiagonal(currentBoard, 2, -1) || checkDiagonal(currentBoard, 0, 1)) return true;

    //Return false if no diagonal
    return false;
  }

  function checkTie (currentBoard) {
    return currentBoard.every(row => row.every(cell => cell !== null));
  }

  const getCurrentPlayer = () => {
    return currentPlayer;
  }

  const resetGame = () => {
    board.resetBoard();
  }


  return { addPlayersToGame, playerTurn, getCurrentPlayer, resetGame };
})();

const startRound = (function() {
  let game;
  let playerNames;
  let boardDivButtons = Array.from(document.querySelectorAll('.board-button'));
  const gameTextOutput = document.querySelector('.game-output');
  const playerNamesModal = document.querySelector('.players');
  const resetGameButtons = document.querySelector('.reset-game-buttons');
  const resetGame = document.getElementById('reset-game');
  const changeNames = document.getElementById('change-names');

  let clickHandler;

  function addBoardListener() {
    clickHandler = (event) => handleBtnInput(event.target);
    
    for (let divButton of boardDivButtons) {
      divButton.classList.remove('disabled');
      divButton.removeEventListener('click', clickHandler);
      divButton.addEventListener('click', clickHandler);
    }
  }

  function handleBtnInput(divButton) {
    divButton.textContent = game.getCurrentPlayer().piece;
    let gridCoordinate = divButton.id.split(',').map(Number);
    let updateBoard = game.playerTurn(gridCoordinate[0], gridCoordinate[1]);
    checkGameWon(updateBoard);
    divButton.classList.add('disabled');
  }

  const checkGameWon = (updateBoard) => {
    if (updateBoard) {
      gameTextOutput.textContent = updateBoard;
      removeBoardListeners();
      game.resetGame();
      resetGameButtons.classList.toggle('hidden');
    }
  }

  function togglePlayerModal () {
    playerNamesModal.classList.toggle("hidden");
  }

  const removeBoardListeners = () => {
    for (let divButton of boardDivButtons) {
      divButton.classList.add('disabled');
      divButton.removeEventListener('click', clickHandler);
    }
  }
  
  function setNewPlayerNames () {
    document.getElementById("player-form").addEventListener("submit", function (e){
      e.preventDefault(); 
      playerNames = getPlayerNames(e.target);
      init(playerNames);
      togglePlayerModal();
    });
  }

  const addPlayersToGame = (playerNames) => {
    game.addPlayersToGame([
      { name: playerNames['player1'], piece: 'X' },
      { name: playerNames['player2'], piece: 'O' }
    ]);
  }

  const addResetButtonListener = () => {
    resetGame.addEventListener('click', () => {
      gameTextOutput.textContent = "Tic-Tac-Toe";
      console.log("setting new game");
      clearGrid();
      init(playerNames);
      resetGameButtons.classList.toggle('hidden');
    });
  }

  const clearGrid = () => {
    for (let divButton of boardDivButtons) {
      divButton.textContent = '';
    }
  }

  function getPlayerNames(form) {
    return Object.fromEntries(new FormData(form));
  }

  const init = (playerNames) => {
    console.log(playerNames);
    game = gameControl;
    addPlayersToGame(playerNames)
    addBoardListener();
  }
  
  addResetButtonListener();

  setNewPlayerNames();

  return { checkGameWon }

})();




