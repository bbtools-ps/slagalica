export const findLongestWord = (dictionary, randomStr) => {
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
export const getDictionary = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get characters from all input fields.
 * @param {object} obj = node list.
 * @returns {string}
 */
export const getChars = (obj) => {
  return [...obj].reduce(
    (acc, curr) => (curr.value ? acc + curr.value : acc),
    ""
  );
};

export const generateRandomChar = (dictionary) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

export const findNextEmptyElementIndex = (inputs, startIndex) => {
  const elementIndex = [...inputs].findIndex(
    (input, index) => !input.value && index > startIndex
  );
  return elementIndex !== -1 ? elementIndex : startIndex;
};

export const findPreviousNotEmptyElementIndex = (inputs, startIndex) => {
  const elementIndex = [...inputs].findLastIndex(
    (input, index) => input.value && index <= startIndex
  );
  return elementIndex !== -1 ? elementIndex : startIndex;
};

export const getIndexFromId = (id) => {
  return Number(id.replace(/[a-zA-Z-]+/g, ""));
};
