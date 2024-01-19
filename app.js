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

// gameBoard.addMoveToBoard('x', 1, 1);
// gameBoard.printBoard();


function gameControl() {

  const board = gameBoard;
  let players = [];

  function createPlayer (name, piece) {
    return { name, piece };
  }

  const addPlayersToGame = (playersData) => {
    players = playersData.map(player => createPlayer(player.name, player.piece));
    console.log(`players are ${players[0].piece} ${players[1].piece}`);
    console.log(players[0]);
  }
  
  let currentPlayer = players[0];

  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  const playerTurn = (x, y) => {
    board.addMoveToBoard(currentPlayer, x, y);

    //checkWinner();

    switchCurrentPlayer();
    board.printBoard();
  };

  return { addPlayersToGame, switchCurrentPlayer, playerTurn };
}

gameControl().addPlayersToGame([
  { name: 'John', piece: 'X' },
  { name: 'Jane', piece: 'O' }
]);

gameControl().playerTurn(2, 1)
//gameControl().checkWinner();