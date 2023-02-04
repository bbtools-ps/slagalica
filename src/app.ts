import {
  findLongestWord,
  findNextEmptyElementIndex,
  findPreviousNotEmptyElementIndex,
  generateRandomChar,
  getChars,
  getDictionary,
} from "./utils";

(async function () {
  // ---------- VARIABLES ----------
  const inputCharacters = document.querySelectorAll(
    ".char"
  ) as NodeListOf<HTMLInputElement>;
  const solution = document.querySelector(".solution") as HTMLInputElement;
  const otherSolutionsList = document.querySelector(
    ".other-solutions"
  ) as HTMLDivElement;
  const btnSearch = document.querySelector(".btn-search");
  const btnReset = document.querySelector(".btn-reset");
  const btnRandom = document.querySelector(".btn-random");
  const letters = document.querySelector(".letters");
  let dictionary: string[];

  const main = async () => {
    // LOADING screen
    document.querySelector("main")!.style.display = "none";
    const loading = document.createElement("div");
    loading.classList.add("loading");
    loading.innerHTML = `<h1>Учитавам речник...</h1>`;
    document.body.append(loading);

    // Get data
    const data = await getDictionary(
      "https://raw.githubusercontent.com/bbtools-ps/slagalica/main/dict/sr-rs.json"
    );

    // Transform JSON data into array
    dictionary = data?.words.split(" ");

    // ERROR screen
    if (!dictionary?.length) {
      document.body.innerHTML = `<div class="loading"><h1>Грешка приликом учитавања речника!</h1></div>`;
      return;
    }

    // HOME screen
    loading.remove();
    document.querySelector("main")!.style.display = "block";
  };

  await main();

  // ---------- EVENT LISTENERS ----------
  letters?.addEventListener("input", function (e) {
    const target = e.target as HTMLInputElement;
    // Matching only input fields
    if (target.tagName.toLowerCase() !== "input") return;

    target.value = target.value.replace(
      /[^абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]/g,
      ""
    );

    if (!target.value) return;

    const nextElementIndex = findNextEmptyElementIndex(
      inputCharacters,
      Number(target.dataset.charIdx)
    );
    inputCharacters[nextElementIndex].focus();
  });

  document.addEventListener("keydown", (e) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Backspace") {
      const currentElementIndex =
        target.dataset.charIdx ?? inputCharacters.length - 1;
      const previousElementIndex = findPreviousNotEmptyElementIndex(
        inputCharacters,
        Number(currentElementIndex)
      );
      inputCharacters[previousElementIndex].focus();
    }
  });

  btnRandom?.addEventListener("click", () => {
    const dictionary = "абвгдђежзијклљмнњопрстћуфхцчџш";
    inputCharacters.forEach((char) => {
      char.value = generateRandomChar(dictionary);
    });
  });

  btnReset?.addEventListener("click", () => {
    inputCharacters.forEach((char) => {
      char.value = "";
    });
    solution!.value = "";
    otherSolutionsList.classList.remove("active");
  });

  btnSearch?.addEventListener("click", (e) => {
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
    otherSolutionsList.querySelector("ul")!.innerHTML = otherSolutions;
  });
})();
