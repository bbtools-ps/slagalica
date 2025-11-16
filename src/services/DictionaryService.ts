import { CHAR_DICTIONARY } from "../constants";

/**
 * DictionaryService - Contains business logic for dictionary operations
 * Following MVC best practices: services handle business logic, not controllers
 */
class DictionaryService {
  /**
   * Generate a random character from the Serbian Cyrillic alphabet
   */
  generateRandomChar() {
    return CHAR_DICTIONARY[Math.floor(Math.random() * CHAR_DICTIONARY.length)];
  }

  /**
   * Generate an array of random characters
   */
  generateRandomChars(count: number) {
    return Array.from({ length: count }, () => this.generateRandomChar());
  }

  /**
   * Validate Serbian Cyrillic input
   */
  validateCyrillicInput(input: string) {
    return input
      .replace(
        /[^абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]/g,
        ""
      )
      .toUpperCase();
  }

  /**
   * Find the next empty input index
   */
  findNextEmptyIndex(values: string[], currentIndex: number) {
    const nextEmptyIndex = values.findIndex(
      (value, index) => !value && index > currentIndex
    );
    return nextEmptyIndex !== -1 ? nextEmptyIndex : currentIndex;
  }

  /**
   * Format solution text with length
   */
  formatSolution(word: string, isMain: boolean = false) {
    const formattedWord = isMain
      ? word.toUpperCase()
      : this.capitalizeWord(word);
    return `${formattedWord} (${word.length})`;
  }

  /**
   * Capitalize the first letter of a word
   */
  private capitalizeWord(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Extract and concatenate input values
   */
  extractCharsFromInputs(inputs: string[]) {
    return inputs.filter(Boolean).join("");
  }
}

export default new DictionaryService();
