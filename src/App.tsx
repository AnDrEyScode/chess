import React, { useState, useEffect } from 'react'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board';

const App = () => {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    resetBoard()
  }, [])

  function resetBoard() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }
  
  return (
    <div className='app'>
      <BoardComponent board={board} setBoard={setBoard}/>
    </div>
  )
}

export default App