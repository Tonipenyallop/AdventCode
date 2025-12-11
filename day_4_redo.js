import fs from "fs/promises";
async function main() {
  const file = (await fs.readFile("./day_4.txt", "utf8")).trim();
  const strGrid = file.split("\n").map((line) => line.split(""));

  return countXmas(strGrid);
}

export function countXmas(grid) {
  const ROW = grid.length;
  const COL = grid[0].length;
  const target = "XMAS";

  const VECTORS = [
    [0, 1], // horizon
    [0, -1], // horizon reverse
    [1, 0], // vertical
    [-1, 0], // vertical
    [1, 1], // diagonal right bottom
    [1, -1], // diagonal right top
    [-1, -1], // diagonal left top
    [-1, 1], // diagonal left bottom
  ];

  let out = 0;

  for (let row = 0; row < ROW; row++) {
    for (let col = 0; col < COL; col++) {
      for (let [dr, dc] of VECTORS) {
        // let foundTarget = false;
        let foundTarget = true;
        // check 8 dir

        if (grid[row][col] !== "X") {
          continue;
        }
        // if (grid[row][col] === "X") {
        for (let k = 1; k < target.length; k++) {
          const newRow = row + dr * k;
          const newCol = col + dc * k;
          if (newRow >= ROW || newRow < 0 || newCol >= COL || newCol < 0) {
            // out of bounds
            foundTarget = false;
            // taesu: why break? -> out of bounds
            break;
          }

          if (grid[newRow][newCol] !== target[k]) {
            // failed to find the target
            foundTarget = false;

            // taesu: why break?
            // break;
          }
        }
        if (foundTarget) {
          out++;
        }
        // }
      }
    }
  }

  return out;
}
