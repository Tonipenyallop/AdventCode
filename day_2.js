import fs from "fs/promises";
import { assert } from "console";

async function main() {
  const file = await fs.readFile("day_2.txt", "utf-8");

  const lines = file.split(/\n/);
  let out = 0;
  for (const lineStr of lines) {
    const lineArr = lineStr.split(/\s/).map((e) => Number(e));

    if (isLevelSafe(lineArr)) {
      out++;
    }
  }
  return out;
}

function isLevelSafe(numbers) {
  const firstDiff = numbers[1] - numbers[0];
  const firstAbs = Math.abs(firstDiff);

  if (firstAbs < 1 || firstAbs > 3) {
    return false;
  }

  const sign = Math.sign(firstDiff);

  for (let i = 2; i < numbers.length; i++) {
    const curDiff = numbers[i] - numbers[i - 1];
    const curAbs = Math.abs(curDiff);
    if (curAbs < 1 || curAbs > 3) {
      return false;
    }

    // facing opposite side
    if (sign !== Math.sign(curDiff)) {
      return false;
    }
  }

  return true;
}

// const out = await main();
// console.log(out);

// const FIRST_ANSWER = 670;
// assert(out === FIRST_ANSWER, `part1 expect ${FIRST_ANSWER} but got ${out}`);

async function main2() {
  const file = await fs.readFile("day_2.txt", "utf-8");

  const lines = file.split(/\n/);
  let out = 0;
  for (const lineStr of lines) {
    const lineArr = lineStr.split(/\s/).map((e) => Number(e));

    if (isLevelSafe2(lineArr)) {
      out++;
    }
  }
  return out;
}

const out2 = await main2();

const SECOND_ANSWER = 700;
assert(out2 === SECOND_ANSWER, `part1 expect ${SECOND_ANSWER} but got ${out2}`);
if (out2 === SECOND_ANSWER) {
  console.log(`✅ Congrats! The answer is ${SECOND_ANSWER}`);
}

function isLevelSafe2(numbers) {
  // allow single failure
  for (let i = 0; i < numbers.length; i++) {
    const arr = [
      ...numbers.slice(0, i),
      ...numbers.slice(i + 1, numbers.length),
    ];
    // need to handle single failure
    if (isLevelSafe(arr)) {
      return true;
    }
  }

  return false;
}
