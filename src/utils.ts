export const getChars = (obj: NodeListOf<HTMLInputElement>) =>
  [...obj].reduce((acc, curr) => (curr.value ? acc + curr.value : acc), "");

export const generateRandomChar = (dictionary: string) =>
  dictionary[Math.floor(Math.random() * dictionary.length)];

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

export const captalize = (str: string) => str[0].toUpperCase() + str.slice(1);
