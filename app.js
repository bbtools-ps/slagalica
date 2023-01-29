(async function () {
  // ---------- VARIABLES ----------
  const inputCharacters = document.querySelectorAll(".char");
  const solution = document.querySelector(".solution");
  const otherSolutionsList = document.querySelector(".other-solutions");
  const searchBtn = document.querySelector(".search-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const randomBtn = document.querySelector(".random-btn");

  // ---------- FUNCTIONS ----------
  const findLongestWord = (dictionary, randomStr) => {
    // create characters map that contains number of occurences for each character from the random string
    const charactersMap = randomStr
      .toLowerCase()
      .split("")
      .reduce((allCharacters, currentCharacter, index, self) => {
        const currentCount = allCharacters[currentCharacter] ?? 0;
        return { ...allCharacters, [currentCharacter]: currentCount + 1 };
      }, {});

    return dictionary
      .filter(
        (word) =>
          [...word].every((character) => charactersMap[character]--) && word
      )
      .sort((a, b) => b.length - a.length);
  };

  /**
   * Get characters from all input fields.
   * @param {object} obj = node list.
   * @returns {string}
   */
  const getChars = (obj) => {
    const arr = [...obj];
    return arr
      .map((item) => {
        if (item.value) {
          return item.value;
        }
      })
      .join("");
  };

  const generateRandomChar = (dictionary) => {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
  };

  // fetch json
  const getDictionary = async (url) => {
    try {
      document.querySelector("main").style.display = "none";
      const loading = document.createElement("div");
      loading.classList.add("loading");
      loading.innerHTML = `<h1>Учитавам речник...</h1>`;
      document.body.appendChild(loading);

      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await getDictionary(
    "https://raw.githubusercontent.com/bbtools-ps/slagalica/main/dict/sr-rs.json"
  );
  const dictionary = data.words.split(" ");

  if (!dictionary.length) {
    document.body.innerHTML = `<div class="loading"><h1>Грешка приликом учитавања речника!</h1></div>`;
    return;
  }

  document.body.removeChild(document.querySelector(".loading"));
  document.querySelector("main").style.display = "block";

  // ---------- EVENT LISTENERS ----------
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
      otherSolutionsList.classList.remove("active");
      alert("Нема такве речи у речнику.");
      return;
    }

    // show the main solution
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
