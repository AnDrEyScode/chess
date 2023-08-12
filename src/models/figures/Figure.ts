import { Colors } from "../Colors";
import logo from '../../assets/black-bishop.png'
import { Cell } from "../Cell";

export enum FigureNames {
  PAWN = "Пешка",
  BISHOP = "Слон",
  KNIGHT = "Конь",
  KING = "Король",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  FIGURE = "Фигура"
}

export class Figure {
  color: Colors;
  name: FigureNames;
  cell: Cell;
  logo: typeof logo | null;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (this.color === target.figure?.color) return false;
    if (target.figure?.name === FigureNames.KING) return false;

    return true;
  }

  moveFigure(target: Cell) {

  }
}