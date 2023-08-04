import React, { useState } from 'react'
import '../App.css'
import CellComponent from './CellComponent'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell';

interface BoardComponentProps {
  board: Board;
  setBoard: (board: Board) => void
}

const BoardComponent: React.FC<BoardComponentProps> = ({ board, setBoard}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (cell.figure) {
      setSelectedCell(cell)
    }
  }

  return (
    <div className='board'>
      { 
        board.cells.map( (row, index) => 
          <React.Fragment key={index}>
            {
              row.map(cell => 
                <CellComponent
                  click={click}
                  cell={cell}
                  key={cell.id}
                  selected={selectedCell?.x === cell.x && selectedCell?.y === cell.y}
                />
              )
            }
          </React.Fragment>
        )
      }
    </div>
  )
}

export default BoardComponent