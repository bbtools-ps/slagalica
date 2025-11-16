export default abstract class View {
  protected _parentElement!: Element | null;

  protected _clear() {
    if (!this._parentElement) return;

    this._parentElement.innerHTML = "";
  }

  /**
   * Escape HTML to prevent XSS
   */
  protected _escapeHtml(text: string) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}
