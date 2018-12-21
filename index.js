const Grid = require('./src/grid');

this.grid = new Grid(60);

let runnedGame = setInterval(() => { console.log(this.grid.reRender().render()) }, 1000)
