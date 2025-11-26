import fs from "fs/promises";
const INCREASE = "increase";
const DECREASE = "decrease";
const ELSE = "else";

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

export function isOrderValid(lineArr) {
  if (lineArr.length < 2) {
    throw new Error("input array is less than 2 length");
  }

  if (typeof lineArr[0] !== "number" || typeof lineArr[1] !== "number") {
    throw new Error(
      `input of lineArr is not a number:${lineArr[0]},${lineArr[1]}`
    );
  }
  if (lineArr[0] === lineArr[1]) {
    return false;
  }

  let prevType = lineArr[0] < lineArr[1] ? INCREASE : DECREASE;

  for (let i = 1; i < lineArr.length; i++) {
    if (typeof lineArr[i] !== "number") {
      throw new Error(`lineArr[i] is not a number:${lineArr[i]}`);
    }
    // increasing
    if (lineArr[i - 1] < lineArr[i]) {
      if (prevType === DECREASE) {
        return false;
      }
    }
    // decreeing
    else if (lineArr[i - 1] > lineArr[i]) {
      if (prevType === INCREASE) {
        return false;
      }
    }
    // case if the value was same
    else if (lineArr[i - 1] === lineArr[i]) {
      return false;
    }
  }

  return true;
}

// number
export function isGapValid(val1, val2) {
  const gap = Math.abs(val1 - val2);

  //   1 to 3
  if (1 <= gap && gap <= 3) {
    return true;
  }
  return false;
}

export function isLevelSafe(lineArr) {
  const orderType = isOrderValid(lineArr);

  if (!orderType) {
    return false;
  }

  lineArr.sort((a, b) => a - b);

  for (let i = 1; i < lineArr.length; i++) {
    if (!isGapValid(lineArr[i - 1], lineArr[i])) {
      return false;
    }
  }
  return true;
}

// const out = await main();
// console.log(out);

async function main2() {
  const file = await fs.readFile("day_2.txt", "utf-8");

  const lines = file.split(/\n/);
  console.log(lines);
  let out = 0;
  for (const lineStr of lines) {
    const lineArr = lineStr.split(/\s/).map((e) => Number(e));
    if (isLevelSafeDampener(lineArr)) {
      out++;
    }
  }

  return out;
}

export function checkSingleUnsafeValue(numbers) {
  let failureAllowance = 1;
  //   check order is valid for single unsafe level
  for (let i = 1; i < numbers.length; i++) {
    const gapValidity = isGapValid(numbers[i - 1], numbers[i]);
    if (!gapValidity && failureAllowance > 0) {
      failureAllowance--;
    }
    // now no allowance
    else if (!gapValidity) {
      return false;
    }
  }
  return true;
}

function isLevelSafeDampener(numbers) {
  // 1. check order type
  const orderType = isOrderValid(numbers);
  // 2. if it's ordered, check gap and return
  if (orderType) {
    for (let i = 1; i < numbers.length; i++) {
      if (!isGapValid(numbers[i - 1], numbers[i])) {
        return false;
      }
    }
    return true;
  }

  // 5. check the valid gap
  return checkSingleUnsafeValue(numbers);
}

// const out = await main2();
// console.log(out); // -> 787: too high, 720: too high 674:too low 736- too high 732: too high 766: too high
// 674 - 720
