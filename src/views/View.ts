export default class View {
  protected _parentElement: Element | null;

  _clear() {
    if (!this._parentElement) return;
    this._parentElement.innerHTML = "";
  }
}
