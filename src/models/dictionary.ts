type Data = { words: string[] };

type State = {
  dictionary: string[];
  searchResults: string[];
};

/**
 * DictionaryModel - Manages dictionary data and search logic
 * Following MVC best practices: model handles data, validation, and core business logic
 */
export const state: State = {
  dictionary: [],
  searchResults: [],
};

/**
 * Load dictionary from JSON file
 * @throws {Error} If dictionary fails to load
 */
export const getDictionary = async () => {
  const response = await fetch("/dict/sr-rs.json");

  if (!response.ok) {
    throw new Error(`Грешка приликом учитавања речника! (${response.status})`);
  }

  const data: Data = await response.json();

  if (!data.words || !Array.isArray(data.words)) {
    throw new Error("Погрешан формат речника!");
  }

  state.dictionary = data.words.sort((a, b) => b.length - a.length);
};

/**
 * Validate search query
 * @param query - String to validate
 * @returns Validation result
 */
const validateQuery = (query: string): { valid: boolean; error?: string } => {
  if (!query || typeof query !== "string") {
    return { valid: false, error: "Унесите слова за претрагу." };
  }

  const trimmedQuery = query.trim();
  if (trimmedQuery.length === 0) {
    return { valid: false, error: "Унесите најмање једно слово." };
  }

  return { valid: true };
};

/**
 * Find all matching words based on available characters
 * @param query - String of available characters
 * @returns Array of matching words sorted by length (descending)
 */
export const findWords = (
  query: string
): { success: boolean; error?: string } => {
  // Validate input
  const validation = validateQuery(query);
  if (!validation.valid) {
    state.searchResults = [];
    return { success: false, error: validation.error };
  }

  // Check if dictionary is loaded
  if (state.dictionary.length === 0) {
    state.searchResults = [];
    return { success: false, error: "Речник није учитан." };
  }

  const queryLower = query.toLowerCase();
  const charactersMap: Record<string, number> = {};

  // Build character frequency map
  for (const char of queryLower) {
    charactersMap[char] = (charactersMap[char] ?? 0) + 1;
  }

  // Filter dictionary for matching words
  state.searchResults = state.dictionary.filter((word) => {
    if (word.length > queryLower.length) {
      return false;
    }

    const charactersMapCopy = { ...charactersMap };

    for (const char of word) {
      if (!charactersMapCopy[char]) {
        return false;
      }
      charactersMapCopy[char]--;
    }
    return true;
  });

  if (state.searchResults.length === 0) {
    return { success: false, error: "Нема такве речи у речнику." };
  }

  return { success: true };
};

export const getSearchResults = () => {
  return [...state.searchResults];
};

export const clearSearchResults = () => {
  state.searchResults = [];
};
