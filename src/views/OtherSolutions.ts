import View from "./View";

class OtherSolutions extends View {
  protected _parentElement = document.querySelector(".other-solutions");

  reset() {
    if (!this._parentElement) return;

    this._parentElement.classList.add("hidden");
    this._parentElement.innerHTML = "";
  }

  renderSolutions(solutions: string[]) {
    if (!this._parentElement) return;

    this._clear();

    const solutionsList = solutions
      .map((solution) => `<li>${this._escapeHtml(solution)}</li>`)
      .join("");
    const markup = `<h2>Остала решења:</h2><ul>${solutionsList}</ul>`;

    this._parentElement.innerHTML = markup;
    this._parentElement.classList.remove("hidden");
  }
}

export default new OtherSolutions();
