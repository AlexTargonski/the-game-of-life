const Cell = require('./cell');

class Grid {
  constructor(size) {
    this.size = size;
    this.create();
  }

  create(randomize) {
    this.cells = new Array(this.size);

    for (let x = 0; x < this.size; x++) {
      this.cells[x] = new Array(this.size);

      for (let y = 0; y < this.size; y++) {
        let isAlive = Math.random() >= 0.5;
        this.cells[x][y] = new Cell(x, y, isAlive);
      }
    }
  }

  isCellAlive(x, y) {
    if (!this.cells[x] || !this.cells[y]) return false;
    let cell = this.cells[x][y];
    return cell && cell.isAlive;
  }

  countNeighborsAlife(cell) {
    let count        = 0;
    let { row, col } = cell;

    if (this.isCellAlive(row--, col--)) count++;
    if (this.isCellAlive(row--, col)) count++;
    if (this.isCellAlive(row--, col++)) count++;
    if (this.isCellAlive(row,   col++)) count++;
    if (this.isCellAlive(row++, col++)) count++;
    if (this.isCellAlive(row++, col)) count++;
    if (this.isCellAlive(row++, col++)) count++;
    if (this.isCellAlive(row,   col++)) count++;

    return count;
  }

  reRender() {
    let newGrid = new Grid(this.size);

    for (let x = 0; x < newGrid.size; x++) {
      for (let y = 0; y < newGrid.size; y++) {
        let cell              = this.cells[x][y];
        let newCell           = newGrid.cells[x][y];
        let neighborsQuantity = this.countNeighborsAlife(cell);

        if (cell.isAlive) {
          if (neighborsQuantity === 2 || neighborsQuantity === 3) {
            newCell.live();
          } else if (neighborsQuantity < 2) {
            newCell.die();
          } else if (neighborsQuantity > 3) {
            newCell.die();
          }
        } else {
          if (neighborsQuantity === 3) {
            newCell.live();
          }
        }
      }
    }
    this.cells = newGrid.cells;
    return this;
  }

  render() {
    let output = '';

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let cell = this.cells[i][j];
        if (cell.isAlive) {
          output += ' ⚪ ';
        } else {
          output += '   ';
        }

        if (cell.column === this.size - 1) {
          output += '\r\n';
        }
      }
    }
    return output;
  }
}

module.exports = Grid;
