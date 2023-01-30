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
    document.querySelector("main").style.display = "none";
    const loading = document.createElement("div");
    loading.classList.add("loading");
    loading.innerHTML = `<h1>Учитавам речник...</h1>`;
    document.body.appendChild(loading);

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
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

export const getLastInputElementIndex = (inputs) => {
  return [...inputs].findLastIndex((input) => input.value);
};
