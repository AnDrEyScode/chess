import React, { useEffect, useState } from 'react'
import '../App.css'
import CellComponent from './CellComponent'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';

interface BoardComponentProps {
  board: Board;
  setBoard: (board: Board) => void,
  currentPlayer: Player | null,
  swapPlayer: () => void,
}

const BoardComponent: React.FC<BoardComponentProps> = ({ board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(
    () => highlightCells(),
    [selectedCell]
  );

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    setBoard(board.getCopyBoard());
  }

  return (
    <div>
      <h3 style={{ margin: 10 }}>
        Текущий игрок {currentPlayer?.color}
      </h3>
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
    </div>
  )
}

export default BoardComponent