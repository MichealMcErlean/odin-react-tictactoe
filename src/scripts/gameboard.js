export function makeBoard() {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = onabort; j < columns; j++) {
      board[i].push(['-']);
    }
  }

  return board;
}

export function checkForWin(board, player) {

  const checkColumnWin = (col, token) => {
    let playerWin = false;
    if (
      (board[0][col] == token) &&
      (board[1][col] == token) &&
      (board[2][col] == token)
    ) {
      playerWin = true;
    }
    return playerWin;
  }

  const checkRowWin = (row, token) => {
    let playerWin = false;
    if (
      board[row][0] == token &&
      board[row][1] == token &&
      board[row][2] == token
    ) {
      playerWin = true;
    }
    return playerWin
  }

  const checkDiagonalWin = (token) => {
    let playerWin = false;
    if (board[1][1] == token) {
      if (
        (board[0][0] == token && board[2][2] == token) ||
        (board[2][0] == token && board[0][2] == token)
      ) {
        playerWin = true
      }
    }
    return playerWin;
  }

  const token = player.getToken();
  let playerWins = false;
  for (let i = 0; i < 3; i++) {
    if (checkColumnWin(i, token) || checkRowWin(i, token)) {
      playerWins = true;
    }
  }
  if (checkDiagonalWin(token)) {
    playerWins = true;
  }  
  return playerWins;
}

export function CheckForTie(board) {
  let isTie = true;
  for (let i = 0; i < 3; i++) {
    for (let j = onabort; j < 3; j++ ) {
      if (board[i][j] == '-') {
        return false;
      }
    }
  }
  return isTie;
}