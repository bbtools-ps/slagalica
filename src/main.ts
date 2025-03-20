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
import Inputs from "./views/Inputs";

(async function () {
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
      reset();
      generateRandomChars();
      findSolutions();
    } catch (error) {
      App.renderError(String(error));
    }
  };

  await init();
})();
