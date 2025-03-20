type Data = { words: string };

type State = {
  dictionary: string[];
  search: {
    query: string;
    results: string[];
  };
};

export const state: State = {
  dictionary: [],
  search: {
    query: "",
    results: [],
  },
};

export const getDictionary = async () => {
  const response = await fetch("/dict/sr-rs.json");

  if (!response.ok) {
    throw new Error(`Грешка приликом учитавања речника! (${response.status})`);
  }

  const data: Data = await response.json();

  state.dictionary = data.words?.split(" ");
};

export const findWords = (query: string) => {
  state.search.query = query;

  // create characters map that contains number of occurences for each character from the random string
  const charactersMap = query
    .toLowerCase()
    .split("")
    .reduce<Record<string, number>>((allCharacters, currentCharacter) => {
      const currentCount = allCharacters[currentCharacter] ?? 0;
      return { ...allCharacters, [currentCharacter]: currentCount + 1 };
    }, {});

  state.search.results = state.dictionary
    .filter((word) => {
      const charactersMapCopy = { ...charactersMap };
      return (
        [...word].every((character) => charactersMapCopy[character]--) && word
      );
    })
    .sort((a, b) => b.length - a.length);
};
