import { describe, expect, it } from "vitest";
import { captalize } from "./utils";

describe("captalize()", () => {
  it("should capitalize the first letter of the word", () => {
    const testWord = "test";
    const result = captalize(testWord);
    expect(result).toBe("Test");
  });
  it("should capitalize just the first letter and other letters should be lowercase", () => {
    const testWord = "TEsT";
    const result = captalize(testWord);
    expect(result).toBe("Test");
  });
  it("should throw an error if no argument is passed", () => {
    // @ts-ignore
    const testFn = () => captalize();
    expect(testFn).toThrow();
  });
});
