import { cloneElement, useState } from 'react'
import './App.css'
import { CheckForTie, makeBoard, checkForWin } from './scripts/gameboard'
import { Player } from './scripts/player'

function App() {

  const [board, setBoard] = useState(makeBoard());
  const [playero, setPlayero] = useState(new Player('o'));
  const [playerx, setPlayerx] = useState(new Player('x'));
  const [currentPlayer, setCurrentPlayer] = useState(playerx);
  const [gameStatus, setGameStatus] = useState(`Your move, ${currentPlayer.getName()}!`);

  function handlePlayerOName(e) {
    let newName = document.getElementById('playeronameText').value;
    let newPlayer = new Player('o');
    newPlayer.setName(newName);
    setPlayero(newPlayer);
  }

  function handlePlayerXName(e) {
    let newName = document.getElementById('playerxnameText').value;
    let newPlayer = new Player('x');
    newPlayer.setName(newName);
    setPlayerx(newPlayer);
  }

  function handleMove(e, iRow, iCol) {
    const newBoard = [...board];
    const newRow = [...newBoard[iRow]];
    newRow[iCol] = currentPlayer.getToken();
    newBoard[iRow] = newRow;
    setBoard(newBoard);

    const isWinner = checkForWin(newBoard, currentPlayer);

    if (isWinner) {
      setGameStatus(`Victory to ${currentPlayer.getName()}!`)

    } else {
      const isTie = CheckForTie(newBoard);
      if (isTie) {
        setGameStatus('Drawn game! As it should be!')
      } else {
        let newPlayer = currentPlayer == playero ? playerx : playero;
        setCurrentPlayer(newPlayer);
        setGameStatus(`Your move, ${newPlayer.getName()}!`);
      }
    }
  }

  function handleClearBoard() {
    setBoard(makeBoard());
  }

  return (
    <main>
      <header>
        <h1>Tic-Tac-Toe</h1>
        <h2>An Odin Project exercise</h2>
        <h3>Powered by React</h3>
      </header>
      <aside>
        <label htmlFor="playeroname">{playero.getName()}</label>
        <input 
          type="text" 
          name="playeroname" 
          id="playeronameText"
        />
        <button type="button" onClick={handlePlayerOName}>Change Name</button>
        <hr />
        <label htmlFor="playerxname">{playerx.getName()}</label>
        <input 
          type="text" 
          name="playerxname"
          id="playerxnameText"
          onChange={handlePlayerXName}
        />
        <button type="button" onClick={handlePlayerXName}>Change Name</button>
      </aside>
      <article>
        <h2>{gameStatus}</h2>
        <div className="board">
          {board.map((row, iRow) => {
            return row.map((cloneElement, iCol) => (
              <button 
                type="button"
                onClick={board[iRow][iCol] == '-' ? (e) => handleMove(e, iRow, iCol) : undefined}
              >
                {board[iRow][iCol]}
              </button>
            ))
          })}
        </div>
        <button type="button" onClick={handleClearBoard}>Clear Board</button>
      </article>
      <footer>
        &copy; Micheal McErlean 2025.
      </footer>
    </main>
  )
}

export default App
