import fs from "fs/promises";

// FIXED: Added the 'g' (global) flag here to ensure it's available for the exec loop later.
// Your original code relied on new RegExp() adding the 'g' flag later.
const XMAX_REGEX = /XMAS/g;
const XMAX_REGEX_REVERSED = /SAMX/g;

async function main() {
  const file = await fs.readFile("./day_4.txt", "utf8");
  // horizontal(backwards), vertical(backwards), diagonal(left and right)

  // FIXED: Added filter to remove empty lines, which could cause indexing errors in rotateArray or findChar.
  const fileByLines = file.split("\n").filter((line) => line.trim().length > 0);
  return countXmas(fileByLines);
}

export function countXmas(fileByLines) {
  let out = 0;
  for (const line of fileByLines) {
    out += findHorizontal(line);
    out += findBackWards(line);
  }

  const fileCopy = fileByLines;
  //   console.log("fileByLines", fileByLines);
  //   console.log("fileCopy", fileCopy);

  //   Arr of file by line
  const rotatedArr = rotateArray(fileCopy);

  //   for checking vertical check
  for (const line of rotatedArr) {
    out += findHorizontal(line);
    out += findBackWards(line);
  }

  //   check diagonal
  out += addDiagonalXmas(fileByLines);

  //   check reversed diagonal
  const reversedFile = reverse2DArr(fileByLines);

  out += addDiagonalXmas(reversedFile);

  //   for (let i = 0; i < reversedFile.length; i++) {
  //     if (findDiagonal(reversedFile[i])) {
  //       out++;
  //     }
  //   }

  console.log("Final thought:", out);
  return out;
}

// main(); // 894 -> too low; 1170 -> too low; 2569 -> right answer

// FIXED: These two functions were replaced with logic to correctly count
// overlapping matches, which `lineStr.match(regex)` typically fails to do.

// Helper function added to handle the actual logic and reuse for both directions
function findMatchesWithOverlap(lineStr, regex) {
  let count = 0;
  let match;
  // Use exec loop to find all matches, crucial for overlapping words
  while ((match = regex.exec(lineStr)) !== null) {
    count++;
    // Move the lastIndex forward by one to find overlapping words (e.g., XMASAMX)
    regex.lastIndex = match.index + 1;
  }
  return count;
}

export function findHorizontal(lineStr) {
  // FIXED: Reset the regex index and call the new helper function.
  // We no longer rely on 'match()' because it doesn't handle overlaps.
  XMAX_REGEX.lastIndex = 0;
  return findMatchesWithOverlap(lineStr, XMAX_REGEX);
}

export function findBackWards(lineStr) {
  // FIXED: Reset the regex index and call the new helper function.
  XMAX_REGEX_REVERSED.lastIndex = 0;
  return findMatchesWithOverlap(lineStr, XMAX_REGEX_REVERSED);
}

const XMAX_CHARS = ["X", "M", "A", "S"];
const WORD_LENGTH = XMAX_CHARS.length; // FIXED: Added this for clarity in findChar

// string input -> Array<string>
// rotate 90 degree right the array
export function rotateArray(fileArr) {
  // FIXED: Added filter/trim to handle empty lines gracefully
  const cleanArr = fileArr.filter((line) => line.trim().length > 0);
  if (cleanArr.length === 0) return [];

  const [ROW, COL] = [cleanArr.length, cleanArr[0].length];

  const rotated = [];

  for (let col = 0; col < COL; col++) {
    const tmp = [];
    for (let row = 0; row < ROW; row++) {
      tmp.push(cleanArr[row][col]);
    }
    rotated.push(tmp.join(""));
  }

  return rotated;
}

// Array<string>
export function reverse2DArr(fileOfArr) {
  // FIXED: Added filter/slice to handle empty lines and ensure non-destructive reverse
  const cleanArr = fileOfArr.filter((line) => line.trim().length > 0);
  return cleanArr
    .slice()
    .reverse()
    .map((line) => line.split("").reverse().join(""));
}

export function addDiagonalXmas(lineArr) {
  let out = 0;
  // FIXED: Convert to grid of characters once for reliable indexing in findChar
  const grid = lineArr.map((line) => line.split(""));

  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      // FIXED: Added check here to only start the expensive recursion if we find 'X'
      if (grid[i][j] === "X") {
        // FIXED: Only pass the necessary parameters (grid, start_row, start_col, word_index)
        if (findChar(grid, i, j, 0)) {
          out++;
        }
      }
    }
  }
  return out;
}

// idx up to 3(index of XMAX_CHARS)
// return true if "XMAS" was found
function findChar(
  lineArr,
  curRow, // FIXED: Renamed lineIdx to curRow for clarity
  curCol, // FIXED: Renamed curCharIdx to curCol for clarity
  xmasCharIdx // FIXED: Removed unused/misleading prevIdx and used xmasCharIdx directly
) {
  const R = lineArr.length;
  const C = lineArr[0].length;

  // FIXED: Base case to check the last character 'S'
  if (xmasCharIdx === WORD_LENGTH - 1) {
    return lineArr[curRow][curCol] === XMAX_CHARS[WORD_LENGTH - 1];
  }

  // 1. Check current position character
  if (lineArr[curRow][curCol] !== XMAX_CHARS[xmasCharIdx]) {
    return false;
  }

  // 2. Define coordinates for the NEXT character (Down-Right diagonal: R+1, C+1)
  const nextRow = curRow + 1;
  const nextCol = curCol + 1;
  const nextXmasIdx = xmasCharIdx + 1;

  // 3. Check boundaries for the NEXT step
  if (nextRow >= R || nextCol >= C) {
    return false;
  }

  // 4. Recurse to find the rest of the word
  // FIXED: Correctly passes the next diagonal coordinates (nextRow, nextCol)
  return findChar(lineArr, nextRow, nextCol, nextXmasIdx);
}

export function countCrossXmas(grid) {
  if (!grid) {
    throw new Error(`grid not provided`);
  }

  let out = 0;
  const ROW = grid.length;
  const COL = grid[0].length;

  function isOutOfBounds(row, col) {
    return !(0 <= row && row < ROW) || !(0 <= col && col < COL);
  }

  const VECTORS = [
    // diagonal left top
    [-1, -1],
    // diagonal right top
    [-1, 1],
    // diagonal left bottom
    [1, -1],
    // diagonal right bottom
    [1, 1],
  ];

  const targetStr = "MAS";
  const firstTarget = targetStr[1]; // "A"
  const targets = [targetStr[0], targetStr[2]]; // "M", "S"

  for (let row = 0; row < ROW; row++) {
    for (let col = 0; col < COL; col++) {
      // contains X
      if (grid[row][col] === firstTarget) {
        console.log("found first target");
        console.log("row,col", row, col);
        let isFound = true;

        const masVals = []; //leftTop, rightTop, leftBottom, rightBottom order

        // check out of bounds
        // loop with each vectors
        for (let i = 0; i < VECTORS.length; i++) {
          const [dr, dc] = VECTORS[i];

          const nextRow = row + dr;
          const nextCol = col + dc;

          if (isOutOfBounds(nextRow, nextCol)) {
            isFound = false;
            break;
          }

          if (
            grid[nextRow][nextCol] !== "M" &&
            grid[nextRow][nextCol] !== "S"
          ) {
            isFound = false;
            break;
          }
          masVals.push(grid[nextRow][nextCol]);
        }

        if (isFound) {
          // when we found, we are sure all the value in the array is either M or S

          if (masVals[0] !== masVals[3] && masVals[1] !== masVals[2]) {
            out++;
          }
        }
      }
    }
  }

  return out;
}

async function main2() {
  const file = await fs.readFile("./day_4.txt", "utf8");
  const strGrid = file.split("\n").map((line) => line.split(""));

  return countCrossXmas(strGrid);
}
