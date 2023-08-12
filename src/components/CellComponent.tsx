import React from 'react'
import '../App.css'
import { Cell } from '../models/Cell'

interface CellComponentProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: React.FC<CellComponentProps> = ({ cell, selected, click }) => {
  return (
    <div
      onClick={() => click(cell)}
      className={`cell ${cell.color} ${selected ? 'selected' : ''}`}
      style={{background: cell.available && cell.figure ? 'green' : ''}}>
      { cell.available && !cell.figure && <div className="available"></div> }
      { cell.figure?.logo && <img src={cell.figure.logo} alt=''/>}
    </div>
  )
}

export default CellComponent