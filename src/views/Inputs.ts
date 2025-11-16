import { INPUT_CHARS_LENGTH } from "../constants";
import View from "./View";

class InputsView extends View {
  protected _parentElement = document.querySelector(".letters");
  protected _inputChars!: NodeListOf<HTMLInputElement>;

  /**
   * Prevent invalid characters from being entered
   */
  private _preventInvalidInput() {
    this._parentElement?.addEventListener("beforeinput", (e: Event) => {
      const event = e as InputEvent;
      const target = event.target;

      if (!(target instanceof HTMLInputElement)) return;

      // Allow deletion and other non-data inputs
      if (!event.data) return;

      // Check if the character is valid Serbian Cyrillic
      const isValid =
        /^[абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]$/.test(
          event.data
        );

      if (!isValid) {
        event.preventDefault();
      }
    });

    // Prevent pasting invalid characters
    this._parentElement?.addEventListener("paste", (e: Event) => {
      const event = e as ClipboardEvent;
      const target = event.target;

      if (!(target instanceof HTMLInputElement)) return;

      event.preventDefault();

      const pastedText = event.clipboardData?.getData("text");
      if (!pastedText) return;

      // Filter to only valid Serbian Cyrillic characters
      const validChars = pastedText
        .replace(
          /[^абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]/g,
          ""
        )
        .toUpperCase();

      if (validChars) {
        target.value = validChars[0]; // Only take first character
        target.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  }

  handleAddLetters(handler: (value: string, currentIndex: number) => void) {
    this._preventInvalidInput();

    this._parentElement?.addEventListener("input", (e: Event) => {
      const target = e.target;

      if (!(target instanceof HTMLInputElement)) return;

      const currentIndex = Number(target.dataset.charIdx);
      handler(target.value, currentIndex);
    });
  }

  handleRemoveLetters(handler: (currentIndex: number) => void) {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const target = e.target;

      if (!(target instanceof HTMLInputElement)) return;
      if (e.key !== "Backspace") return;

      const currentIndex = Number(
        target.dataset.charIdx ?? this._inputChars.length - 1
      );
      handler(currentIndex);
    });
  }

  reset() {
    this._inputChars.forEach((input) => {
      input.value = "";
    });
  }

  getInputValues() {
    return Array.from(this._inputChars).map((input) => input.value);
  }

  setInputValues(values: string[]) {
    this._inputChars.forEach((input, index) => {
      input.value = values[index] || "";
    });
  }

  updateInput(index: number, value: string) {
    if (this._inputChars[index]) {
      this._inputChars[index].value = value;
    }
  }

  focusInput(index: number) {
    const input = this._inputChars[index];
    if (!input) return;

    setTimeout(() => {
      input.focus();
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }, 0);
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
