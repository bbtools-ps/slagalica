class Options {
  protected _btnSearch = document.querySelector(".btn-search") as HTMLElement;
  protected _btnReset = document.querySelector(".btn-reset") as HTMLElement;
  protected _btnRandom = document.querySelector(".btn-random") as HTMLElement;

  handleRandom(handler: () => void) {
    this._btnRandom?.addEventListener("click", handler);
  }

  handleReset(handler: () => void) {
    this._btnReset?.addEventListener("click", handler);
  }

  handleSearch(handler: () => void) {
    this._btnSearch?.addEventListener("click", handler);
  }
}

export default new Options();
