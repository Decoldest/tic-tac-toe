let gridSpace = 'temp';

const gameBoard = (function() {
  const columns = 3;
  const rows = 3;
  const board = new Array(rows).fill(null).map(() => new Array(columns).fill(null).map(() => gridSpace()));
  
  const getBoard = () => board;

  const addMoveToBoard = (player, positionX, positionY) => {
    const checkEmptySpace = board[positionX][positionY].getValue();
    if (checkEmptySpace) {
      return;
    } else {
      board[positionX][positionY].addPlayerToSpace(player);
    }
  }

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((gridSpace) => gridSpace.getValue()));
    console.log(boardWithCellValues);
  }

  function gridSpace() {
    let gridValue = null;
    
    const getValue = () => gridValue;

    const addPlayerToSpace = (player) => gridValue = player;
  
    return { addPlayerToSpace, getValue };
  }

  return { addMoveToBoard, getBoard, printBoard };
})();


function createPlayer (piece) {
  return { piece };
}

gameBoard.printBoard();
gameBoard.addMoveToBoard('x', 1, 1);
gameBoard.addMoveToBoard('y', 1, 1);
gameBoard.printBoard();
