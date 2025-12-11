import { assert } from "console";
export function expect(result, expectedVal) {
  assert(
    result === expectedVal,
    `expect result to be ${expectedVal} but got ${result}`
  );
  if (result === expectedVal) {
    console.log(`congrats! output is ${expectedVal}`);
  }
}
