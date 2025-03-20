export const getChars = (obj: NodeListOf<HTMLInputElement>) =>
  [...obj].reduce((acc, curr) => (curr.value ? acc + curr.value : acc), "");

export const generateRandomChar = (dictionary: string) =>
  dictionary[Math.floor(Math.random() * dictionary.length)];

export const findNextEmptyElementIndex = (
  inputs: NodeListOf<HTMLInputElement>,
  currentInputIndex: number
) => {
  if (!inputs || currentInputIndex === undefined) {
    throw new Error("Required arguments are not defined");
  }

  const elementIndex = [...inputs].findIndex(
    (input, index) => !input.value && index > currentInputIndex
  );
  return elementIndex !== -1 ? elementIndex : currentInputIndex;
};

export const captalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();
