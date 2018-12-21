const readlineSync = require('readline-sync');
const readline     = require('readline');

const Grid     = require('./src/grid');

let size = readlineSync.question('Type size of grid:');

let grid;

if (size < 10 || size > 200) {
  throw "number must be between 0 and 200"
} else {
  grid = new Grid(size);
}

var play = function() {
  return grid.reRender().render()
}

let runnedGame = setInterval(() => {
  let output = play();

   readline.cursorTo(process.stdout, 0, 0);
   readline.clearScreenDown(process.stdout);
   process.stdout.write(output);
}, 1000)
