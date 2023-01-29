import {
  findLongestWord,
  generateRandomChar,
  getChars,
  getDictionary,
  getLastInputElementIndex,
} from "./utils";

(async function () {
  // ---------- VARIABLES ----------
  const inputCharacters = document.querySelectorAll(".char");
  const solution = document.querySelector(".solution");
  const otherSolutionsList = document.querySelector(".other-solutions");
  const searchBtn = document.querySelector(".search-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const randomBtn = document.querySelector(".random-btn");

  const data = await getDictionary(
    "https://raw.githubusercontent.com/bbtools-ps/slagalica/main/dict/sr-rs.json"
  );

  const dictionary = data?.words.split(" ");

  if (!dictionary?.length) {
    document.body.innerHTML = `<div class="loading"><h1>Грешка приликом учитавања речника!</h1></div>`;
    return;
  }

  document.body.removeChild(document.querySelector(".loading"));
  document.querySelector("main").style.display = "block";

  // ---------- EVENT LISTENERS ----------
  inputCharacters.forEach((item) =>
    item.addEventListener("input", () => {
      const lastElementIndex = getLastInputElementIndex(inputCharacters);
      inputCharacters[
        lastElementIndex !== inputCharacters.length - 1
          ? lastElementIndex + 1
          : inputCharacters.length - 1
      ].focus();
    })
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      const lastElementIndex = getLastInputElementIndex(inputCharacters);
      inputCharacters[lastElementIndex].value = "";
      inputCharacters[lastElementIndex].focus();
    }
  });

  randomBtn.addEventListener("click", () => {
    const dictionary = "абвгдђежзијклљмнњопрстћуфхцчџш";
    inputCharacters.forEach((char) => {
      char.value = generateRandomChar(dictionary);
    });
  });

  resetBtn.addEventListener("click", () => {
    inputCharacters.forEach((char) => {
      char.value = "";
    });
    solution.value = "";
    otherSolutionsList.classList.remove("active");
  });

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const randomString = getChars(inputCharacters);
    const results = findLongestWord(dictionary, randomString);

    if (!results.length) {
      solution.value = "";
      otherSolutionsList.classList.remove("active");
      alert("Нема такве речи у речнику.");
      return;
    }

    solution.value = results[0];

    const otherSolutions = [...results]
      .splice(1, 5)
      .reduce(
        (allSolutions, solution) => allSolutions + `<li>${solution}</li>`,
        ""
      );

    otherSolutionsList.classList.add("active");
    otherSolutionsList.querySelector("ul").innerHTML = otherSolutions;
  });
})();
