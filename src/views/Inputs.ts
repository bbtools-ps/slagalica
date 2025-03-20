import { INPUT_CHARS_LENGTH } from "../constants";
import View from "./View";

class InputsView extends View {
  protected _parentElement = document.querySelector(".letters");
  protected _inputChars!: NodeListOf<HTMLInputElement>;

  handleAddLetters(handler: (payload: HTMLInputElement) => void) {
    this._parentElement?.addEventListener("input", (e: Event) => {
      const target = e.target;

      if (!(target instanceof HTMLInputElement)) return;

      handler(target);
    });
  }

  handleRemoveLetters(handler: (payload: HTMLInputElement) => void) {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const target = e.target;

      if (!(target instanceof HTMLInputElement)) return;

      if (e.key !== "Backspace") return;

      handler(target);
    });
  }

  reset() {
    this._inputChars.forEach((input) => {
      input.value = "";
    });
  }

  get inputChars() {
    return this._inputChars;
  }

  private _createInputElement(index: number) {
    return `
      <input
        type="text"
        maxlength="1"
        class="char"
        data-char-idx=${index}
        value=""
        aria-label="слово ${index + 1}"
      />`;
  }

  render() {
    if (!this._parentElement) return;

    this._clear();

    const inputChars = Array.from({ length: INPUT_CHARS_LENGTH }, (_, i) =>
      this._createInputElement(i)
    ).join(" ");

    this._parentElement.innerHTML = inputChars;
    this._inputChars = this._parentElement.querySelectorAll(
      ".char"
    ) as NodeListOf<HTMLInputElement>;
  }
}

export default new InputsView();
