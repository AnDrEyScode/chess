import React, { useState, useEffect } from 'react'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFiguresComponent from './components/LostFiguresComponent';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);


  useEffect(() => {
    resetBoard()
  }, [])

  function resetBoard() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === whitePlayer.color ? blackPlayer : whitePlayer);
  }
  
  return (
    <div className='app'>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <LostFiguresComponent title="Чёрные фигуры" figures={board.lostBlackFigures}/>
      <LostFiguresComponent title="Белые фигуры" figures={board.lostWhiteFigures}/>
    </div>
  )
}

export default App