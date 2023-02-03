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
  const btnSearch = document.querySelector(".btn-search");
  const btnReset = document.querySelector(".btn-reset");
  const btnRandom = document.querySelector(".btn-random");
  let dictionary;

  const main = async () => {
    // LOADING screen
    document.querySelector("main").style.display = "none";
    const loading = document.createElement("div");
    loading.classList.add("loading");
    loading.innerHTML = `<h1>Учитавам речник...</h1>`;
    document.body.appendChild(loading);

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
    document.body.removeChild(document.querySelector(".loading"));
    document.querySelector("main").style.display = "block";
  };

  await main();

  // ---------- EVENT LISTENERS ----------
  inputCharacters.forEach((item) =>
    item.addEventListener("input", function (e) {
      this.value = e.target.value.replace(
        /[^абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]/g,
        ""
      );
      let lastElementIndex = getLastInputElementIndex(inputCharacters);
      inputCharacters[
        lastElementIndex !== inputCharacters.length - 1 &&
        lastElementIndex !== -1
          ? lastElementIndex + 1
          : lastElementIndex !== -1
          ? inputCharacters.length - 1
          : 0
      ].focus();
    })
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      let lastElementIndex = getLastInputElementIndex(inputCharacters);
      lastElementIndex = lastElementIndex !== -1 ? lastElementIndex : 0;
      inputCharacters[lastElementIndex].focus();
    }
  });

  btnRandom.addEventListener("click", () => {
    const dictionary = "абвгдђежзијклљмнњопрстћуфхцчџш";
    inputCharacters.forEach((char) => {
      char.value = generateRandomChar(dictionary);
    });
  });

  btnReset.addEventListener("click", () => {
    inputCharacters.forEach((char) => {
      char.value = "";
    });
    solution.value = "";
    otherSolutionsList.classList.remove("active");
  });

  btnSearch.addEventListener("click", (e) => {
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
