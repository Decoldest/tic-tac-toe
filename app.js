const gameBoard = (function() {
  const columns = 3;
  const rows = 3;
  const boardSpaces = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => gridSpace())
  );

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

  return { addMoveToBoard, getBoard };
})();

// gameBoard.addMoveToBoard('x', 1, 1);
// gameBoard.printBoard();


function gameControl() {

  const board = gameBoard;
  let players = [];
  let currentPlayer

  function createPlayer (name, piece) {
    return { name, piece };
  }

  const addPlayersToGame = (playersData) => {
    players = playersData.map(player => createPlayer(player.name, player.piece));
    console.log(`players are ${players[0].piece} ${players[1].piece}`);
    currentPlayer = players[0];
  }

  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  const playerTurn = (x, y) => {
    console.log(currentPlayer);
    board.addMoveToBoard(currentPlayer, x, y);

    checkWinner();

    switchCurrentPlayer();
    console.log(board.getBoard());
  };

  function checkWinner () {
    const currentBoard = board.getBoard();
    //Returns true if all row values are equal (win)
    const checkRow = row => row.every(val => val !== null && val === row[0]);    

    for(let i = 0; i < currentBoard.length; i++){
      console.log(checkRow(currentBoard[i]));
    }

    console.log("checking winner");
    console.log(board.getBoard());
  }

  return { addPlayersToGame, switchCurrentPlayer, playerTurn };
}

const game = gameControl();

game.addPlayersToGame([
  { name: 'Player 1', piece: 'X' },
  { name: 'Player 2', piece: 'O' }
]);
game.playerTurn(2, 1);
