import View from "./View";

class ErrorNotification extends View {
  private _element: HTMLDivElement | null = null;
  private _timeout: number | null = null;

  private _createElement() {
    if (this._element) return this._element;

    this._element = document.createElement("div");
    this._element.classList.add("error-notification", "hidden");
    this._element.setAttribute("role", "alert");
    this._element.setAttribute("aria-live", "polite");

    document.body.appendChild(this._element);
    return this._element;
  }

  show(message: string, duration: number = 5000) {
    const element = this._createElement();

    element.innerHTML = `
      <div class="error-notification__content">
        <i class="fas fa-exclamation-circle"></i>
        <span>${this._escapeHtml(message)}</span>
        <button class="error-notification__close" aria-label="Затвори">×</button>
      </div>
    `;

    // Add close button handler
    const closeBtn = element.querySelector(".error-notification__close");
    closeBtn?.addEventListener("click", () => this.hide());

    // Show notification
    element.classList.remove("hidden");

    // Auto-hide after duration
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = window.setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    if (!this._element) return;

    this._element.classList.add("hidden");

    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
}

export default new ErrorNotification();
