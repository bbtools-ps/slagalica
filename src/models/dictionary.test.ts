import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearSearchResults,
  findWords,
  getDictionary,
  getSearchResults,
  state,
} from "./dictionary";

const testResponseData = { words: ["тест", "реч", "речник", "слово", "книга"] };

const testFetch = vi.fn(
  (_url, _options) =>
    new Promise((resolve, _reject) => {
      const testResponse = {
        ok: true,
        json() {
          return new Promise((resolve, _reject) => resolve(testResponseData));
        },
      };
      resolve(testResponse);
    })
);

vi.stubGlobal("fetch", testFetch);

describe("Dictionary Model", () => {
  describe("getDictionary()", () => {
    beforeEach(() => {
      state.dictionary = [];
      state.searchResults = [];
    });

    it("should load dictionary successfully", async () => {
      await getDictionary();
      expect(state.dictionary).toHaveLength(5);
    });

    it("should sort dictionary by length descending", async () => {
      await getDictionary();
      const lengths = state.dictionary.map((word) => word.length);
      const sortedLengths = [...lengths].sort((a, b) => b - a);
      expect(lengths).toEqual(sortedLengths);
    });

    it("should throw error if response is not ok", async () => {
      testFetch.mockImplementationOnce(
        (_url, _options) =>
          new Promise((resolve, _reject) => {
            const testResponse = {
              ok: false,
              status: 404,
              json() {
                return new Promise((resolve, _reject) =>
                  resolve(testResponseData)
                );
              },
            };
            resolve(testResponse);
          })
      );

      await expect(getDictionary()).rejects.toThrow(
        "Грешка приликом учитавања речника!"
      );
    });

    it("should throw error for invalid data format", async () => {
      testFetch.mockImplementationOnce(
        (_url, _options) =>
          new Promise((resolve, _reject) => {
            const testResponse = {
              ok: true,
              json() {
                return new Promise((resolve, _reject) => resolve({}));
              },
            };
            resolve(testResponse);
          })
      );

      await expect(getDictionary()).rejects.toThrow("Погрешан формат речника!");
    });

    it("should throw error if words is not an array", async () => {
      testFetch.mockImplementationOnce(
        (_url, _options) =>
          new Promise((resolve, _reject) => {
            const testResponse = {
              ok: true,
              json() {
                return new Promise((resolve, _reject) =>
                  resolve({ words: "not an array" })
                );
              },
            };
            resolve(testResponse);
          })
      );

      await expect(getDictionary()).rejects.toThrow("Погрешан формат речника!");
    });
  });

  describe("findWords()", () => {
    beforeEach(() => {
      state.dictionary = ["програм", "рачунар", "речник", "реч", "ре", "р"];
      state.searchResults = [];
    });

    it("should find matching words", () => {
      findWords("речник");
      expect(state.searchResults.length).toBeGreaterThan(0);
    });

    it("should return words that can be formed from given characters", () => {
      findWords("абвреч");
      const results = state.searchResults;
      results.forEach((word) => {
        expect(word.length).toBeLessThanOrEqual(6);
      });
    });

    it("should throw error for empty query", () => {
      expect(() => findWords("")).toThrow("Унесите слова за претрагу");
    });

    it("should throw error for whitespace-only query", () => {
      expect(() => findWords("   ")).toThrow("најмање једно слово");
    });

    it("should throw error when dictionary is empty", () => {
      state.dictionary = [];
      expect(() => findWords("тест")).toThrow("Речник није учитан");
    });

    it("should throw error when no words match", () => {
      expect(() => findWords("жџшч")).toThrow("Нема такве речи");
    });

    it("should be case insensitive", () => {
      expect(() => findWords("РЕЧ")).not.toThrow();
      expect(() => findWords("реч")).not.toThrow();
    });

    it("should not allow words longer than query", () => {
      findWords("реч");
      const tooLong = state.searchResults.filter((word) => word.length > 3);
      expect(tooLong).toHaveLength(0);
    });

    it("should respect character frequency", () => {
      state.dictionary = ["ааа", "аа", "а"];
      findWords("аа");
      expect(state.searchResults).not.toContain("ааа");
      expect(state.searchResults).toContain("аа");
      expect(state.searchResults).toContain("а");
    });
  });

  describe("getSearchResults()", () => {
    it("should return copy of search results", () => {
      state.searchResults = ["тест", "реч"];
      const results = getSearchResults();
      expect(results).toEqual(["тест", "реч"]);
      expect(results).not.toBe(state.searchResults);
    });

    it("should return empty array when no results", () => {
      state.searchResults = [];
      const results = getSearchResults();
      expect(results).toEqual([]);
    });
  });

  describe("clearSearchResults()", () => {
    it("should clear search results", () => {
      state.searchResults = ["тест", "реч", "речник"];
      clearSearchResults();
      expect(state.searchResults).toEqual([]);
    });

    it("should work when already empty", () => {
      state.searchResults = [];
      clearSearchResults();
      expect(state.searchResults).toEqual([]);
    });
  });
});
