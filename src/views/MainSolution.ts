class MainSolution {
  protected _parentElement = document.querySelector(
    ".solution"
  ) as HTMLInputElement;

  reset() {
    this._parentElement.value = "";
  }

  renderSolution(value: string) {
    if (!this._parentElement) return;
    this._parentElement.value = value;
  }
}

export default new MainSolution();
