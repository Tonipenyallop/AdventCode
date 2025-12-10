import fs from "fs/promises";
import { assert } from "console";
import { expect } from "./testUtil.js";
import {
  findHorizontal,
  //   findDiagonal,
  findBackWards,
  rotateArray,
  countXmas,
  reverse2DArr,
  addDiagonalXmas,
} from "./day_4.js";
import { execPath } from "process";
function testFindHorizontal() {
  const case1 = "XMASXMAS";

  const out = findHorizontal(case1);

  assert(out === 2, `expect output to be 2 but got ${out}`);
  if (out === 2) {
    console.log("congrats! output is 2");
  }
}

// testFindHorizontal();

function testFindBackWards() {
  const case1 = "SAMXSAMXSAMX";
  const out = findBackWards(case1);
  const EXPECTED_RES = 3;

  assert(
    out === EXPECTED_RES,
    `expect output to be ${EXPECTED_RES} but got ${out}`
  );
  if (out === EXPECTED_RES) {
    console.log(`congrats! output is ${EXPECTED_RES}`);
  }
}
// testFindBackWards();

function testRotateArray() {
  const case1 = `12345\n12345\n12345\n12345\n12345`;

  const res = rotateArray(case1);

  const EXP1 = "11111";
  const EXP2 = "22222";
  const EXP3 = "33333";
  const EXP4 = "44444";
  const EXP5 = "55555";

  assert(res[0] === EXP1, `expect output to be ${EXP1} but got ${res[1]}`);
  if (res[0] === EXP1) {
    console.log(`congrats! output is ${EXP1}`);
  }
  assert(res[1] === EXP2, `expect output to be ${EXP2} but got ${res[2]}`);
  if (res[1] === EXP2) {
    console.log(`congrats! output is ${EXP2}`);
  }
  assert(res[2] === EXP3, `expect output to be ${EXP3} but got ${res[3]}`);
  if (res[2] === EXP3) {
    console.log(`congrats! output is ${EXP3}`);
  }
  assert(res[3] === EXP4, `expect output to be ${EXP4} but got ${res[4]}`);
  if (res[3] === EXP4) {
    console.log(`congrats! output is ${EXP4}`);
  }
  assert(res[4] === EXP5, `expect output to be ${EXP5} but got ${res[5]}`);
  if (res[4] === EXP5) {
    console.log(`congrats! output is ${EXP5}`);
  }
}
// testRotateArray();

// function testFindDiagonal() {
//   /*
//     valid diagonal
//         `
//         X...
//         .M..
//         ..A.
//         ...S
//         `
//     */
//   const case1 = `X...\n.M..\n..A.\n...S`.split("\n");

//   /*
//      "s" out of bounds
//         `
//         .X..
//         ..M.
//         ...A
//         ...S       `
// */

//   const case2 = `.X..\n..M.\n...A\n...S`.split("\n");

//   /*
//      "M" out of bounds
//         `
//         ..X.
//         ...M
//         A...
//         .S..
//         `
//     */

//   const case3 = "..X.\n...M\nA...\n.S..".split("\n");

//   const res = findDiagonal(case1);
//   assert(res === true, `expect res to be true but got ${res}`);
//   if (res === true) {
//     console.log(`congrats! output is ${res}`);
//   }
//   const res2 = findDiagonal(case2);
//   assert(res2 === false, `expect res2 to be false but got ${res2}`);
//   if (res2 === false) {
//     console.log(`congrats! output is ${res2}`);
//   }
//   const res3 = findDiagonal(case3);
//   assert(res3 === false, `expect res3 to be false but got ${res3}`);
//   if (res3 === false) {
//     console.log(`congrats! output is ${res3}`);
//   }
// }
// testFindDiagonal();

function testAddDiagonalXmas() {
  /*
    valid diagonal   
        `
        X...X...
        .M...M..
        ..A...A.
        ...S...S
        `
    */

  const case4 = "X...X...\n.M...M..\n..A...A.\n...S...S".split("\n");
  const res = addDiagonalXmas(case4);
  const exp = 2;
  expect(res, exp);
}

// testAddDiagonalXmas();

function testReverse2DArr() {
  const case1 = ["1234", "5678"];
  const exp = ["8765", "4321"];
  const res = reverse2DArr(case1);
  expect(res[0], exp[0]);
  expect(res[1], exp[1]);

  const case2 = ["abc", "def", "ghi", "jkl"];
  const exp2 = ["lkj", "ihg", "fed", "cba"];
  const res2 = reverse2DArr(case2);
  expect(res2[0], exp2[0]);
  expect(res2[1], exp2[1]);
  expect(res2[2], exp2[2]);
  expect(res2[3], exp2[3]);
}

// testReverse2DArr();

async function testCountXmasSmall() {
  const case1 = await fs.readFile("./day_4_small.txt", "utf8");

  const lineArr = case1.split("\n");

  const res = countXmas(lineArr);
  const expectation = 18;
  expect(res, expectation);
}
// await testCountXmasSmall();

async function testCountXmas() {
  const case1 = await fs.readFile("./day_4.txt", "utf8");

  const lineArr = case1.split("\n");
  const res = countXmas(lineArr);
  const expectation = 2569;
  expect(res, expectation);
}
await testCountXmas();
