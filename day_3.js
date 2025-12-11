import { assert } from "console";
import fs from "fs/promises";
async function main() {
  const contents = await fs.readFile("./day_3.txt", "utf8");
  //   1. get mul(number,number) pattern
  const regex = /mul\(\d+,\d+\)/g;
  const matchedStr = contents.match(regex);

  let out = 0;
  for (let mulSyntax of matchedStr) {
    const numRegex = /\d+/gm;

    const [leftStr, rightStr] = mulSyntax.match(numRegex);
    const mulVal = Number(leftStr) * Number(rightStr);
    out += mulVal;
  }

  return out;
}

// const out = await main();
// console.log(out);

async function main2() {
  // prev instruction
  //  -> undefined, do -> calculate
  //  -> don't -> ignore
  let out = 0;

  //   const contents = await fs.readFile("./day_3_small.txt", "utf8");
  const contents = await fs.readFile("./day_3.txt", "utf8");
  const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;

  const instructions = contents.match(regex);
  console.log(instructions);
  let shouldAdd = true;
  for (const instruction of instructions) {
    if (instruction === "do()") {
      shouldAdd = true;
    } else if (instruction === "don't()") {
      shouldAdd = false;
    } else if (shouldAdd) {
      const [left, right] = instruction.match(/\d+/gm);
      out += Number(left) * Number(right);
    } else if (!shouldAdd) {
    }
  }

  return out;
}

const out2 = await main2();
console.log("out2", out2);

const PART_2_ANSWER = 95846796;
assert(
  out2 === PART_2_ANSWER,
  `output should be ${PART_2_ANSWER} but got ${out2}`
);

if (out2 === PART_2_ANSWER) {
  console.log(`✅ Congrats! You got answer right:${out2}`);
}
