class App {
  protected _parentElement: Element | null = document.querySelector("main");
  protected _loadingElement: Element;
  protected _form = document.querySelector("form");

  _createElement() {
    this._loadingElement = document.createElement("div");
    this._loadingElement.classList.add("loading");
  }

  renderLoading() {
    this._createElement();
    this._loadingElement.innerHTML = `<h1>Учитавам речник...</h1>`;

    this._parentElement?.insertAdjacentElement(
      "beforebegin",
      this._loadingElement
    );
  }

  renderError(message: string) {
    this._createElement();
    this._loadingElement.innerHTML = `<h1>${message}</h1>`;

    this._parentElement?.insertAdjacentElement(
      "afterbegin",
      this._loadingElement
    );
  }

  handleForm(handler: (payload: SubmitEvent) => void) {
    this._form?.addEventListener("submit", (e: SubmitEvent) => handler(e));
  }

  render() {
    this._loadingElement.remove();
    this._parentElement?.classList.remove("hidden");
  }
}

export default new App();