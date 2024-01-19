let gridSpace = 'temp';

const gameBoard = (function() {
  const columns = 3;
  const rows = 3;
  const board = new Array(rows).fill(gridSpace).map(() => new Array(columns).fill(gridSpace));
  
  const getBoard = () => board;

  const addMoveToBoard = (player, positionX, positionY) => {
    const checkEmptySpace = board[positionX][positionY];
    if (!checkEmptySpace) {
      return;
    } else {
      //AddMove
    }
  }

  return { addMoveToBoard, getBoard };
})();


function createPlayer (piece) {
  return { piece };
}
