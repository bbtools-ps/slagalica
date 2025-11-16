import { describe, expect, it } from "vitest";
import { CHAR_DICTIONARY, INPUT_CHARS_LENGTH } from "./index";

describe("Constants", () => {
  describe("INPUT_CHARS_LENGTH", () => {
    it("should be defined", () => {
      expect(INPUT_CHARS_LENGTH).toBeDefined();
    });

    it("should be a positive number", () => {
      expect(INPUT_CHARS_LENGTH).toBeGreaterThan(0);
    });

    it("should be 12", () => {
      expect(INPUT_CHARS_LENGTH).toBe(12);
    });
  });

  describe("CHAR_DICTIONARY", () => {
    it("should be defined", () => {
      expect(CHAR_DICTIONARY).toBeDefined();
    });

    it("should be a string", () => {
      expect(typeof CHAR_DICTIONARY).toBe("string");
    });

    it("should contain Serbian Cyrillic characters", () => {
      expect(CHAR_DICTIONARY).toContain("А");
      expect(CHAR_DICTIONARY).toContain("Б");
      expect(CHAR_DICTIONARY).toContain("В");
    });

    it("should contain all 30 Serbian Cyrillic letters", () => {
      // Serbian Cyrillic alphabet has 30 letters
      expect(CHAR_DICTIONARY.length).toBe(30);
    });

    it("should contain special Serbian letters", () => {
      expect(CHAR_DICTIONARY).toContain("Ђ");
      expect(CHAR_DICTIONARY).toContain("Ж");
      expect(CHAR_DICTIONARY).toContain("Љ");
      expect(CHAR_DICTIONARY).toContain("Њ");
      expect(CHAR_DICTIONARY).toContain("Ћ");
      expect(CHAR_DICTIONARY).toContain("Џ");
      expect(CHAR_DICTIONARY).toContain("Ш");
    });

    it("should not contain Latin characters", () => {
      expect(CHAR_DICTIONARY).not.toContain("a");
      expect(CHAR_DICTIONARY).not.toContain("Z");
    });

    it("should not contain numbers", () => {
      expect(CHAR_DICTIONARY).not.toContain("1");
      expect(CHAR_DICTIONARY).not.toContain("9");
    });

    it("should be uppercase only", () => {
      expect(CHAR_DICTIONARY).toBe(CHAR_DICTIONARY.toUpperCase());
    });
  });
});
