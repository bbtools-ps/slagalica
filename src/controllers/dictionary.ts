import { INPUT_CHARS_LENGTH } from "../constants";
import * as model from "../models/dictionary";
import DictionaryService from "../services/DictionaryService";
import App from "../views/App";
import ErrorNotification from "../views/ErrorNotification";
import Inputs from "../views/Inputs";
import MainSolution from "../views/MainSolution";
import Options from "../views/Options";
import OtherSolutions from "../views/OtherSolutions";

export const controlInputs = () => {
  Inputs.handleAddLetters((value, currentIndex) => {
    // Validate and format input
    const validatedValue = DictionaryService.validateCyrillicInput(value);

    if (!validatedValue) return;

    // Update the current input
    Inputs.updateInput(currentIndex, validatedValue);

    // Find and focus next empty input
    const inputValues = Inputs.getInputValues();
    const nextIndex = DictionaryService.findNextEmptyIndex(
      inputValues,
      currentIndex
    );
    Inputs.focusInput(nextIndex);
  });

  Inputs.handleRemoveLetters((currentIndex) => {
    // Clear current input
    Inputs.updateInput(currentIndex, "");

    // Focus previous input
    const previousIndex = Math.max(0, currentIndex - 1);
    Inputs.focusInput(previousIndex);
  });
};

export const controlForm = () => {
  App.handleForm((event) => event.preventDefault());
};

export const findSolutions = () => {
  Options.handleSearch(() => {
    // Get input values
    const inputValues = Inputs.getInputValues();
    const searchQuery = DictionaryService.extractCharsFromInputs(inputValues);

    // Perform search
    const result = model.findWords(searchQuery);

    // Handle search failure
    if (!result.success) {
      ErrorNotification.show(result.error || "Грешка при претрази.");
      return;
    }

    // Get results
    const searchResults = model.getSearchResults();

    if (searchResults.length === 0) {
      ErrorNotification.show("Нема такве речи у речнику.");
      return;
    }

    // Format and display results
    const [mainSolution] = searchResults;
    const otherSolutions = searchResults
      .slice(1, 6)
      .map((word) => DictionaryService.formatSolution(word, false));

    MainSolution.renderSolution(
      DictionaryService.formatSolution(mainSolution, true)
    );
    OtherSolutions.renderSolutions(otherSolutions);
  });
};

export const reset = () => {
  Options.handleReset(() => {
    Inputs.reset();
    MainSolution.reset();
    OtherSolutions.reset();
    model.clearSearchResults();
    ErrorNotification.hide();
  });
};

export const generateRandomChars = () => {
  Options.handleRandom(() => {
    // Clear previous results
    MainSolution.reset();
    OtherSolutions.reset();
    ErrorNotification.hide();

    // Generate random characters
    const randomChars =
      DictionaryService.generateRandomChars(INPUT_CHARS_LENGTH);

    // Update inputs
    Inputs.setInputValues(randomChars);
  });
};
