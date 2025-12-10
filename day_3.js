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

const out = await main();
console.log(out);
