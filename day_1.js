// const fs = require("fs").promises;
import fs from "fs/promises";
async function part1() {
  const res = await fs.readFile("day_1.txt", "utf8");
  const fileLines = res.split("\n");

  //   left and right
  const dataList = { left: [], right: [] };
  for (const line of fileLines) {
    const splitted = line.replaceAll(/\s+/g, ",").split(",");
    const [left, right] = splitted;

    dataList["left"].push(Number(left));
    dataList["right"].push(Number(right));
  }
  dataList.left.sort((a, b) => a - b);
  dataList.right.sort((a, b) => a - b);

  if (dataList.left.length !== dataList.right.length) {
    throw new Error("left and right has different length");
  }

  const out = [];

  for (let i = 0; i < dataList.left.length; i++) {
    const curLeft = dataList.left[i];
    const curRight = dataList.right[i];
    const gap = Math.abs(curLeft - curRight);
    out.push(gap);
  }

  return out.reduce((acc, curVal) => {
    return acc + curVal;
  }, 0);
}

const part1Out = await part1();
console.log("part1", part1Out);

async function part2() {
  //   const res = await fs.readFile("day_1.txt", "utf8");
  const res = await fs.readFile("day_1.txt", "utf8");
  const fileLines = res.split("\n");

  const dataList = {};

  //   for keys
  const locationKeys = [];
  for (const line of fileLines) {
    const splitted = line.replaceAll(/\s+/g, ",").split(",");
    const [left] = splitted;
    locationKeys.push(left);
  }

  for (const line of fileLines) {
    const splitted = line.replaceAll(/\s+/g, ",").split(",");
    const [left, right] = splitted;

    if (dataList[right] === undefined) {
      dataList[right] = 0;
    }
    dataList[right] += 1;
  }

  let out = [];
  for (let keyString of locationKeys) {
    const score = Number(keyString) * (dataList[keyString] ?? 0);
    out.push(score);
  }

  console.log("out", out);
  return out.reduce((acc, cur) => acc + cur, 0);
}

const out2 = await part2();
console.log(out2);
