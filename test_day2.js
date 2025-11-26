import { assert } from "console";
import {
  //
  isGapValid,
  isLevelSafe,
  checkSingleUnsafeValue,
} from "./day_2.js";

const INCREASE = "increase";
const DECREASE = "decrease";
const ELSE = "else";

function testIsGapValid() {
  const ig1 = [0, 1];
  const ig2 = [5, 4];
  const ig3 = [6, 8];
  const ig4 = [6, 9];
  const ig5 = [6, 10];

  assert(isGapValid(ig1[0], ig1[1]) === true);
  assert(isGapValid(ig2[0], ig2[1]) === true);
  assert(isGapValid(ig3[0], ig3[1]) === true);
  assert(isGapValid(ig4[0], ig4[1]) === true);
  assert(isGapValid(ig5[0], ig5[1]) === false);
}

// testIsGapValid();

function testIsLevelSafe() {
  //   ascending all safe
  const ig1 = [0, 1, 3, 6];
  //   descending all safe
  const ig2 = [6, 3, 1, 0];
  //   unsafe dups
  const ig3 = [6, 6, 8];
  //   unsafe un-ordered
  const ig4 = [6, 9, 5];

  assert(isLevelSafe(ig1) === true);
  assert(isLevelSafe(ig2) === true);
  assert(isLevelSafe(ig3) === false);
  assert(isLevelSafe(ig4) === false);
}

// testIsLevelSafe();

function testCheckSingleUnsafeValue() {
  const ig1 = [1, 3, 2, 4, 5]; // single unsafe
  const ig2 = [8, 6, 4, 4, 1]; // single unsafe
  const ig3 = [8, 6, 7, 4, 1]; // single unsafe

  const ig4 = [1, 3, 2, 6, 5]; // double unsafe
  const ig5 = [8, 9, 4, 10, 1]; // double unsafe
  const ig6 = [8, 6, 4, 10, 1]; // double unsafe

  assert(checkSingleUnsafeValue(ig1) === true, "case 1 expect true");
  assert(checkSingleUnsafeValue(ig2) === true, "case 2");
  assert(checkSingleUnsafeValue(ig3) === true, "case 3");
  assert(checkSingleUnsafeValue(ig4) === false, "case 4");
  assert(checkSingleUnsafeValue(ig5) === false, "case 5");
  assert(checkSingleUnsafeValue(ig6) === true, "case 6");
}
testCheckSingleUnsafeValue();
