import { INPUT_CHARS_LENGTH } from "../constants";
import View from "./View";

class InputsView extends View {
  protected _parentElement = document.querySelector(".letters");
  protected _inputChars: NodeListOf<HTMLInputElement>;

  handleAddLetters(handler: (payload: HTMLInputElement) => void) {
    this._parentElement?.addEventListener(
      "input",
      function (e: Event) {
        const target = e.target as HTMLInputElement;
        // Matching only input fields
        if (target.tagName.toLowerCase() !== "input") return;

        handler(target);
      }.bind(this)
    );
  }

  handleRemoveLetters(handler: (payload: HTMLInputElement) => void) {
    document.addEventListener(
      "keydown",
      function (e: KeyboardEvent) {
        const target = e.target as HTMLInputElement;
        if (e.key !== "Backspace") return;

        handler(target);
      }.bind(this)
    );
  }

  reset() {
    this._inputChars.forEach((input) => {
      input.value = "";
    });
  }

  get inputChars() {
    return this._inputChars;
  }

  render() {
    if (!this._parentElement) return;

    this._clear();

    let inputChars: string[] = [];

    for (let i = 0; i < INPUT_CHARS_LENGTH; i++) {
      inputChars.push(`<input
      type="text"
      maxlength="1"
      class="char"
      data-char-idx=${i}
      value=""
      aria-label="слово ${i + 1}"
    />`);
    }

    this._parentElement.innerHTML = inputChars.join(" ");
    this._inputChars = this._parentElement.querySelectorAll(
      ".char"
    ) as NodeListOf<HTMLInputElement>;
  }
}

export default new InputsView();
