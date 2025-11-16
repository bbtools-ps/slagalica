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
 * @throws {Error} If query is invalid
 */
const validateQuery = (query: string) => {
  if (!query || typeof query !== "string") {
    throw new Error("Унесите слова за претрагу.");
  }

  const trimmedQuery = query.trim();
  if (trimmedQuery.length === 0) {
    throw new Error("Унесите најмање једно слово.");
  }
};

/**
 * Find all matching words based on available characters
 * @param query - String of available characters
 * @throws {Error} If query is invalid, dictionary not loaded, or no words found
 */
export const findWords = (query: string) => {
  // Validate input
  validateQuery(query);

  // Check if dictionary is loaded
  if (state.dictionary.length === 0) {
    state.searchResults = [];
    throw new Error("Речник није учитан.");
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
    throw new Error("Нема такве речи у речнику.");
  }
};

export const getSearchResults = () => {
  return [...state.searchResults];
};

export const clearSearchResults = () => {
  state.searchResults = [];
};
