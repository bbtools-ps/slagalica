export const findLongestWord = (dictionary: string[], randomStr: string) => {
  // create characters map that contains number of occurences for each character from the random string
  const charactersMap = randomStr
    .toLowerCase()
    .split("")
    .reduce((allCharacters, currentCharacter) => {
      const currentCount = allCharacters[currentCharacter] ?? 0;
      return { ...allCharacters, [currentCharacter]: currentCount + 1 };
    }, {});

  return dictionary
    .filter((word) => {
      const charactersMapCopy = { ...charactersMap };
      return (
        [...word].every((character) => charactersMapCopy[character]--) && word
      );
    })
    .sort((a, b) => b.length - a.length);
};

// fetch json
export const getDictionary = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getChars = (obj: NodeListOf<HTMLInputElement>) => {
  return [...obj].reduce(
    (acc, curr) => (curr.value ? acc + curr.value : acc),
    ""
  );
};

export const generateRandomChar = (dictionary: string) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

export const findNextEmptyElementIndex = (
  inputs: NodeListOf<HTMLInputElement>,
  startIndex: number
) => {
  const elementIndex = [...inputs].findIndex(
    (input, index) => !input.value && index > startIndex
  );
  return elementIndex !== -1 ? elementIndex : startIndex;
};

export const findPreviousNotEmptyElementIndex = (
  inputs: NodeListOf<HTMLInputElement>,
  startIndex: number
) => {
  const elementIndex = [...inputs].findLastIndex(
    (input, index) => input.value && index <= startIndex
  );
  return elementIndex !== -1 ? elementIndex : startIndex;
};
