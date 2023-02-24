import fs from "fs";
import { Window } from "happy-dom";
import path from "path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CHAR_DICTIONARY, INPUT_CHARS_LENGTH } from "./config";
import {
  captalize,
  findNextEmptyElementIndex,
  generateRandomChar,
  getChars,
} from "./utils";

const htmlDocPath = path.join(process.cwd(), "./src/index.html");
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
vi.stubGlobal("document", document);

const createInputCharElements = () => {
  const inputs = document.querySelector(".letters");
  const inputChars: string[] = [];
  for (let i = 0; i < INPUT_CHARS_LENGTH; i++) {
    inputChars.push(`<input
      type="text"
      maxlength="1"
      class="char"
      data-char-idx=${i}
      value=""
    />`);
    inputs.innerHTML = inputChars.join(" ");
  }
};

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
  it("should throw an error if no argument are passed", () => {
    // @ts-ignore
    const testFn = () => captalize();
    expect(testFn).toThrow();
  });
});

describe("getChars()", () => {
  beforeEach(() => {
    document.write(htmlDocContent);
    createInputCharElements();
  });
  it('should return an empty string if no characters are found inside all inputs with the className of ".char"', () => {
    const allInputs = document.querySelectorAll(
      ".char"
    ) as unknown as NodeListOf<HTMLInputElement>;
    const result = getChars(allInputs);

    expect(result).toHaveLength(0);
    expect(result).toBe("");
  });
  it('should get all characters that are inside the inputs with the className of ".char"', () => {
    const allInputs = document.querySelectorAll(
      ".char"
    ) as unknown as NodeListOf<HTMLInputElement>;
    allInputs.forEach((input) => (input.value = "A"));

    const result = getChars(allInputs);

    expect(result).toHaveLength(INPUT_CHARS_LENGTH);
    expect(result).toBe("AAAAAAAAAAAA");
  });
  it("should throw an error if no argument are passed", () => {
    // @ts-ignore
    const resultFn = () => getChars();

    expect(resultFn).toThrow();
  });
});

describe("generateRandomChar()", () => {
  it("should return a random character from the given string (dictionary) of characters", () => {
    const result = generateRandomChar(CHAR_DICTIONARY);

    expect(result).toBeTypeOf("string");
    expect(result).toHaveLength(1);
  });
  it("should throw an error if no argument are passed", () => {
    // @ts-ignore
    const resultFn = () => generateRandomChar();

    expect(resultFn).toThrow();
  });
});

describe("findNextEmptyElementIndex()", () => {
  beforeEach(() => {
    document.write(htmlDocContent);
    createInputCharElements();
  });
  it("should return the index of next empty input field based on the current field index", () => {
    const allInputs = document.querySelectorAll(
      ".char"
    ) as unknown as NodeListOf<HTMLInputElement>;
    const emptyInputIndex = 3;
    const currentInputIndex = emptyInputIndex - 1;
    for (let i = 0; i < emptyInputIndex; i++) {
      allInputs[i].value = "A";
    }

    const result = findNextEmptyElementIndex(allInputs, currentInputIndex);

    expect(result).toBe(emptyInputIndex);
    expect(result).toBeGreaterThan(currentInputIndex);
    expect(result).toBeTypeOf("number");
  });
  it("should return the currentInputIndex if all inputs are not empty", () => {
    const allInputs = document.querySelectorAll(
      ".char"
    ) as unknown as NodeListOf<HTMLInputElement>;
    allInputs.forEach((input) => (input.value = "A"));
    const currentInputIndex = 3;

    const result = findNextEmptyElementIndex(allInputs, currentInputIndex);

    expect(result).toBe(currentInputIndex);
  });
  it("should throw an error if no argument are passed", () => {
    // @ts-ignore
    const resultFn = () => findNextEmptyElementIndex();

    expect(resultFn).toThrow();
  });
});

describe("findPreviousNotEmptyElementIndex()", () => {
  it("should throw an error if no argument are passed", () => {
    // @ts-ignore
    const resultFn = () => findNextEmptyElementIndex();

    expect(resultFn).toThrow();
  });
});
