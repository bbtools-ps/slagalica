import {
  controlForm,
  controlInputs,
  findSolutions,
  generateRandomChars,
  reset,
} from "./controllers/dictionary";
import "./main.css";
import * as model from "./models/dictionary";
import App from "./views/App";
import ErrorNotification from "./views/ErrorNotification";
import Inputs from "./views/Inputs";

(async function () {
  const init = async () => {
    try {
      // Show loading state
      App.renderLoading();

      // Initialize Model - Load dictionary data
      await model.getDictionary();

      // Initialize Views - Render UI components
      App.render();
      Inputs.render();

      // Initialize Controllers - Setup event handlers
      controlForm();
      controlInputs();
      reset();
      generateRandomChars();
      findSolutions();
    } catch (error) {
      // Handle initialization errors
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      App.renderError(errorMessage);
      ErrorNotification.show(errorMessage);
    }
  };

  await init();
})();
