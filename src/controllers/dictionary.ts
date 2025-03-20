import { CHAR_DICTIONARY } from "../constants";
import * as model from "../models/dictionary";
import {
  captalize,
  findNextEmptyElementIndex,
  findPreviousNotEmptyElementIndex,
  generateRandomChar,
  getChars,
} from "../utils";
import App from "../views/App";
import Inputs from "../views/Inputs";
import MainSolution from "../views/MainSolution";
import Options from "../views/Options";
import OtherSolutions from "../views/OtherSolutions";

export const controlInputs = () => {
  const inputChars = Inputs.inputChars;

  Inputs.handleAddLetters((target) => {
    target.value = target.value
      .replace(
        /[^абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]/g,
        ""
      )
      .toUpperCase();

    if (!target.value) return;

    const currentElementIndex = Number(target.dataset.charIdx);
    const nextElementIndex = findNextEmptyElementIndex(
      inputChars,
      currentElementIndex
    );
    const nextElement = inputChars[nextElementIndex];
    nextElement.focus();
  });

  Inputs.handleRemoveLetters((target) => {
    const currentElementIndex = Number(
      target.dataset.charIdx ?? inputChars.length - 1
    );
    let previousElementIndex = findPreviousNotEmptyElementIndex(
      inputChars,
      currentElementIndex
    );

    target.value = "";

    if (previousElementIndex === currentElementIndex) {
      previousElementIndex = Number(currentElementIndex) - 1;
    }

    const previousElement = inputChars[previousElementIndex];

    if (!previousElement) return;

    setTimeout(() => {
      previousElement.focus();

      const len = previousElement.value.length;
      previousElement.setSelectionRange(len, len);
    }, 0);
  });
};

export const controlForm = () => {
  App.handleForm((event) => event.preventDefault());
};

export const findSolutions = () => {
  Options.handleSearch(() => {
    const searchQuery = getChars(Inputs.inputChars);

    model.findWords(searchQuery);

    if (!model.state.search.results.length)
      return alert("Нема такве речи у речнику.");

    const [mainSolution] = model.state.search.results;
    const otherSolutions = model.state.search.results
      .slice(1, 6)
      .map((item) => captalize(item));

    MainSolution.renderSolution(mainSolution.toUpperCase());
    OtherSolutions.renderSolutions(otherSolutions);
  });
};

export const reset = () => {
  Options.handleReset(() => {
    Inputs.reset();
    MainSolution.reset();
    OtherSolutions.reset();
  });
};

export const generateRandomChars = () => {
  Options.handleRandom(() => {
    const inputChars = Inputs.inputChars;

    MainSolution.reset();
    OtherSolutions.reset();

    inputChars.forEach((char) => {
      char.value = generateRandomChar(CHAR_DICTIONARY);
    });
  });
};
