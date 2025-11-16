import { describe, expect, it } from "vitest";
import { CHAR_DICTIONARY } from "../constants";
import DictionaryService from "./DictionaryService";

describe("DictionaryService", () => {
  describe("generateRandomChar()", () => {
    it("should return a single character", () => {
      const char = DictionaryService.generateRandomChar();
      expect(char).toHaveLength(1);
    });

    it("should return a character from the dictionary", () => {
      const char = DictionaryService.generateRandomChar();
      expect(CHAR_DICTIONARY).toContain(char);
    });

    it("should generate different characters on multiple calls", () => {
      const chars = new Set();
      for (let i = 0; i < 50; i++) {
        chars.add(DictionaryService.generateRandomChar());
      }
      // Should have some variety (at least 5 different chars in 50 tries)
      expect(chars.size).toBeGreaterThan(5);
    });
  });

  describe("generateRandomChars()", () => {
    it("should generate correct number of characters", () => {
      const result = DictionaryService.generateRandomChars(5);
      expect(result).toHaveLength(5);
    });

    it("should generate 12 characters when requested", () => {
      const result = DictionaryService.generateRandomChars(12);
      expect(result).toHaveLength(12);
    });

    it("should return empty array for zero count", () => {
      const result = DictionaryService.generateRandomChars(0);
      expect(result).toHaveLength(0);
    });

    it("should return all valid characters from dictionary", () => {
      const result = DictionaryService.generateRandomChars(10);
      result.forEach((char) => {
        expect(CHAR_DICTIONARY).toContain(char);
      });
    });
  });

  describe("validateCyrillicInput()", () => {
    it("should convert lowercase to uppercase", () => {
      const result = DictionaryService.validateCyrillicInput("абв");
      expect(result).toBe("АБВ");
    });

    it("should remove non-Cyrillic characters", () => {
      const result = DictionaryService.validateCyrillicInput("АБВ123abc");
      expect(result).toBe("АБВ");
    });

    it("should remove Latin characters", () => {
      const result = DictionaryService.validateCyrillicInput("АБВabc");
      expect(result).toBe("АБВ");
    });

    it("should remove Latin Š character", () => {
      const result = DictionaryService.validateCyrillicInput("АБВŠšČč");
      expect(result).toBe("АБВ");
    });

    it("should remove all Latin extended characters", () => {
      const result = DictionaryService.validateCyrillicInput("АБВđĐžŽćĆčČšŠ");
      expect(result).toBe("АБВ");
    });

    it("should handle empty string", () => {
      const result = DictionaryService.validateCyrillicInput("");
      expect(result).toBe("");
    });

    it("should preserve valid Serbian Cyrillic characters", () => {
      const input = "АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ";
      const result = DictionaryService.validateCyrillicInput(input);
      expect(result).toBe(input);
    });

    it("should handle mixed case Serbian Cyrillic", () => {
      const result = DictionaryService.validateCyrillicInput("аБвГдЂ");
      expect(result).toBe("АБВГДЂ");
    });

    it("should remove spaces and special characters", () => {
      const result = DictionaryService.validateCyrillicInput("АБВ !@#$%");
      expect(result).toBe("АБВ");
    });

    it("should handle only invalid characters", () => {
      const result = DictionaryService.validateCyrillicInput("abc123!@#");
      expect(result).toBe("");
    });
  });

  describe("findNextEmptyIndex()", () => {
    it("should find next empty index", () => {
      const values = ["А", "Б", "", "В", ""];
      const result = DictionaryService.findNextEmptyIndex(values, 1);
      expect(result).toBe(2);
    });

    it("should return current index if no empty slots ahead", () => {
      const values = ["А", "Б", "В", "Г"];
      const result = DictionaryService.findNextEmptyIndex(values, 1);
      expect(result).toBe(1);
    });

    it("should skip to last empty index", () => {
      const values = ["А", "Б", "В", ""];
      const result = DictionaryService.findNextEmptyIndex(values, 0);
      expect(result).toBe(3);
    });

    it("should handle all empty values", () => {
      const values = ["", "", "", ""];
      const result = DictionaryService.findNextEmptyIndex(values, 0);
      expect(result).toBe(1);
    });

    it("should return current index at end of array", () => {
      const values = ["А", "Б", "В"];
      const result = DictionaryService.findNextEmptyIndex(values, 2);
      expect(result).toBe(2);
    });

    it("should handle single element array", () => {
      const values = ["А"];
      const result = DictionaryService.findNextEmptyIndex(values, 0);
      expect(result).toBe(0);
    });
  });

  describe("formatSolution()", () => {
    it("should format main solution in uppercase", () => {
      const result = DictionaryService.formatSolution("абвгд", true);
      expect(result).toBe("АБВГД (5)");
    });

    it("should format non-main solution with capitalization", () => {
      const result = DictionaryService.formatSolution("абвгд", false);
      expect(result).toBe("Абвгд (5)");
    });

    it("should include word length", () => {
      const result = DictionaryService.formatSolution("тест", true);
      expect(result).toContain("(4)");
    });

    it("should handle single character word", () => {
      const result = DictionaryService.formatSolution("а", false);
      expect(result).toBe("А (1)");
    });

    it("should handle long words", () => {
      const word = "абвгдежзијклмнопрстуфхцч";
      const result = DictionaryService.formatSolution(word, false);
      expect(result).toBe(`Абвгдежзијклмнопрстуфхцч (${word.length})`);
    });
  });

  describe("extractCharsFromInputs()", () => {
    it("should concatenate non-empty values", () => {
      const inputs = ["А", "Б", "В"];
      const result = DictionaryService.extractCharsFromInputs(inputs);
      expect(result).toBe("АБВ");
    });

    it("should skip empty values", () => {
      const inputs = ["А", "", "Б", "", "В"];
      const result = DictionaryService.extractCharsFromInputs(inputs);
      expect(result).toBe("АБВ");
    });

    it("should handle all empty values", () => {
      const inputs = ["", "", ""];
      const result = DictionaryService.extractCharsFromInputs(inputs);
      expect(result).toBe("");
    });

    it("should handle empty array", () => {
      const inputs: string[] = [];
      const result = DictionaryService.extractCharsFromInputs(inputs);
      expect(result).toBe("");
    });

    it("should preserve order", () => {
      const inputs = ["З", "Д", "Р", "А", "В", "О"];
      const result = DictionaryService.extractCharsFromInputs(inputs);
      expect(result).toBe("ЗДРАВО");
    });
  });
});
