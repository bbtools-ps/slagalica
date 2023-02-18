import * as model from "./model";
import {
  findNextEmptyElementIndex,
  findPreviousNotEmptyElementIndex,
  generateRandomChar,
  getChars,
} from "./utils";
import App from "./views/App";
import Inputs from "./views/Inputs";
import MainSolution from "./views/MainSolution";
import Options from "./views/Options";
import OtherSolutions from "./views/OtherSolutions";

(async function () {
  const controlInputs = () => {
    const inputChars = Inputs.inputChars;

    Inputs.handleAddLetters((target) => {
      target.value = target.value.replace(
        /[^абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]/g,
        ""
      );

      if (!target.value) return;

      const nextElementIndex = findNextEmptyElementIndex(
        inputChars,
        Number(target.dataset.charIdx)
      );
      inputChars[nextElementIndex].focus();
    });

    Inputs.handleRemoveLetters((target) => {
      const currentElementIndex =
        target.dataset.charIdx ?? inputChars.length - 1;
      const previousElementIndex = findPreviousNotEmptyElementIndex(
        inputChars,
        Number(currentElementIndex)
      );
      inputChars[previousElementIndex].focus();
    });
  };

  const controlForm = () => {
    App.handleForm((event) => event.preventDefault());
  };

  const controlSearch = () => {
    Options.handleSearch(() => {
      const searchQuery = getChars(Inputs.inputChars);

      model.findWords(searchQuery);

      if (!model.state.search.results.length) return;

      MainSolution.renderSolution(model.state.search.results[0]);
      OtherSolutions.renderSolutions(model.state.search.results.slice(1, 6));
    });
  };

  const controlReset = () => {
    Options.handleReset(() => {
      Inputs.reset();
      MainSolution.reset();
      OtherSolutions.reset();
    });
  };

  const controlGenerateRandomChars = () => {
    Options.handleRandom(() => {
      const dictionary = "абвгдђежзијклљмнњопрстћуфхцчџш";
      const inputChars = Inputs.inputChars;

      inputChars.forEach((char) => {
        char.value = generateRandomChar(dictionary);
      });
    });
  };

  const init = async () => {
    try {
      // Loading
      App.renderLoading();

      // Get data
      await model.getDictionary();

      // Render
      App.render();
      Inputs.render();

      // Add controls
      controlForm();
      controlInputs();
      controlReset();
      controlGenerateRandomChars();
      controlSearch();
    } catch (error) {
      App.renderError(error);
    }
  };

  await init();
})();