import { CHAR_DICTIONARY } from "../constants/constants";
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

    const nextElementIndex = findNextEmptyElementIndex(
      inputChars,
      Number(target.dataset.charIdx)
    );
    inputChars[nextElementIndex].focus();
  });

  Inputs.handleRemoveLetters((target) => {
    const currentElementIndex = target.dataset.charIdx ?? inputChars.length - 1;
    const previousElementIndex = findPreviousNotEmptyElementIndex(
      inputChars,
      Number(currentElementIndex)
    );
    inputChars[previousElementIndex].focus();
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
