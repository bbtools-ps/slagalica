export default abstract class View {
  protected _parentElement!: Element | null;

  protected _clear() {
    if (!this._parentElement) return;

    this._parentElement.innerHTML = "";
  }
}
