class MainSolution {
  protected _parentElement = document.querySelector(
    ".solution"
  ) as HTMLInputElement;

  reset() {
    if (!this._parentElement) return;
    this._parentElement.value = "";
    this._parentElement.classList.remove("solved");
  }

  renderSolution(value: string) {
    if (!this._parentElement) return;
    this._parentElement.value = value;
    this._parentElement.classList.add("solved");
  }
}

export default new MainSolution();
