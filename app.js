const gameBoard = (function() {
  const columns = 3;
  const rows = 3;
  const boardSpaces = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => gridSpace())
  );

  const getBoard = () => boardSpaces;

  const addMoveToBoard = (player, positionX, positionY) => {
    const checkEmptySpace = boardSpaces[positionX][positionY].getValue();
    if (checkEmptySpace) {
      return;
    } else {
      boardSpaces[positionX][positionY].addPlayerToSpace(player);
    }
  };

  const printBoard = () => {
    const boardWithCellValues = boardSpaces.map((row) => row.map((gridSpace) => gridSpace.getValue()));
    console.log(boardWithCellValues);
  };

  function gridSpace() {
    let gridValue = null;
    
    const getValue = () => gridValue;

    const addPlayerToSpace = (player) => gridValue = player;
  
    return { addPlayerToSpace, getValue };
  };

  return { addMoveToBoard, getBoard, printBoard };
})();

console.log(gameBoard.addMoveToBoard('x',1,1));
console.log(gameBoard.printBoard());


function gameControl() {

  const board = gameBoard;
  players = [];

  function createPlayer (piece) {
    return { piece };
  }

  const getControllerBoard = () => {
    board.getBoard;
  }

  const addPlayersToGame = () => {
    players = [createPlayer('X'), createPlayer('O')]
  }
  
  let currentPlayer = players[0];

  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  const playerTurn = (player, x, y) => {
    board.addMoveToBoard(currentPlayer, x, y);
  };

  return { switchCurrentPlayer, playerTurn, getControllerBoard };
}
