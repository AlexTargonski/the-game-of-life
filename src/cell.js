class Cell {
  constructor(x, y, alive = false) {
    this._row = x;
    this._col = y;
    this._alive = alive;
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._col;
  }

  get isAlive() {
    return this._alive;
  }

  die() {
    this._alive = false;
  }

  live() {
    this._alive = true;
  }
}

module.exports = Cell;
