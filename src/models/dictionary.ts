type Data = { words: string[] };

type State = {
  dictionary: string[];
  searchResults: string[];
};

export const state: State = {
  dictionary: [],
  searchResults: [],
};

export const getDictionary = async () => {
  const response = await fetch("/dict/sr-rs.json");

  if (!response.ok) {
    throw new Error(`Грешка приликом учитавања речника! (${response.status})`);
  }

  const data: Data = await response.json();

  state.dictionary = data.words?.sort((a, b) => b.length - a.length) ?? [];
};

export const findWords = (query: string) => {
  const queryLower = query.toLowerCase();
  const charactersMap: Record<string, number> = {};

  for (const char of queryLower) {
    charactersMap[char] = (charactersMap[char] ?? 0) + 1;
  }

  state.searchResults = state.dictionary.filter((word) => {
    const charactersMapCopy = { ...charactersMap };

    for (const char of word) {
      if (!charactersMapCopy[char]) {
        return false;
      }
      charactersMapCopy[char]--;
    }
    return true;
  });
};
