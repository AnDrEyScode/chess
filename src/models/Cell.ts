import { BlobOptions } from "buffer";
import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";


export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.id = Math.random();
    this.available = false;
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEmptyVertical(target: Cell): boolean {
    if (target.x !== this.x)
      return false;

    const maxY = Math.max(this.y, target.y);
    const minY = Math.min(this.y, target.y);

    for (let y = minY + 1; y < maxY; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) 
        return false;
    }

    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (target.y !== this.y)
      return false;

    const maxX = Math.max(this.x, target.x);
    const minX = Math.min(this.x, target.x);

    for (let x = minX + 1; x < maxX; x++) {
      if (!this.board.getCell(x, this.y).isEmpty())
        return false;
    }

    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(this.x - target.x);
    const absY = Math.abs(this.y - target.y);
    if (absX !== absY)
      return false;

    const dx = this.x < target.x ? 1 : -1;
    const dy = this.y < target.y ? 1 : -1;

    for(let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) 
        return false;
    }

    return true;
  }

  isEnemy(target: Cell): boolean {
    if (!target.figure) return false;
    
    return this.figure?.color !== target.figure.color;
  }

  setFigure(figure: Figure): void {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostFigure(figure: Figure) {
    if (figure.color === Colors.BLACK) {
      this.board.lostBlackFigures.push(figure);
    } else {
      this.board.lostWhiteFigures.push(figure);
    }
  }


  public moveFigure(target: Cell): void {
    if (!this.figure || !this.figure.canMove(target))
      return;

    this.figure.moveFigure(target);
    if (target.figure) {
      this.addLostFigure(target.figure);
    }

    target.setFigure(this.figure);
    this.figure = null;
  }
}