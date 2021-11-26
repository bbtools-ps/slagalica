(function () {
    // ---------- FUNCTIONS ----------
    /**
     * Find longest words from random characters.
     * @param {array} dictionary = contains all words.
     * @param {string} str = random characters.
     * @returns
     */
    const findLongestWord = (dictionary, str) => {
        // make a copy of the original dictionary
        let words = [...dictionary];
        // random string to toLowerCase
        str.toLowerCase();
        // loop through each item from the dictionary and filter only the results
        let result = words.filter((word) => {
            // convert each word into array of chars for better manipulation
            let chars = word.toLowerCase().split("");
            // loop through each character from random string
            for (let j = 0; j < str.length; j++) {
                let index = chars.indexOf(str[j]);
                // if character exists remove it from array
                if (index !== -1) {
                    chars.splice(index, 1);
                }
            }
            // if each char of the word is used it is a match so return that word
            if (chars.length === 0) {
                return word;
            }
        });

        // sort the results from in descending order
        result.sort((a, b) => {
            return b.length - a.length;
        });

        return result;
    };

    /**
     * Get characters from input fields.
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

    /**
     * Display all solutions in html.
     * @param {array} results = the array of results
     */
    const showSolutions = (results, solution, otherSolutionsList) => {
        // show the main solution
        solution.value = results[0];
        // if there are other solutions show them as well
        if (results[1]) {
            let otherSolutions = [];
            for (let i = 1; i <= 5; i++) {
                if (results[i]) {
                    otherSolutions.push(results[i]);
                }
            }
            otherSolutions = otherSolutions
                .map((solution) => {
                    return `<li>${solution}</li>`;
                })
                .join("");
            otherSolutionsList.classList.add("active");
            otherSolutionsList.querySelector("ul").innerHTML = otherSolutions;
        }
    };

    function generateRandomChar() {
        let azbuka = "абвгдђежзијклљмнњопрстћуфхцчџш";
        return azbuka[Math.floor(Math.random() * azbuka.length)];
    }

    // ---------- VARIABLES ----------
    const xmlhttp = new XMLHttpRequest();
    const url = "./dict/sr-rs.json";
    const inputCharacters = document.querySelectorAll(".char");
    const solution = document.querySelector(".solution");
    const otherSolutionsList = document.querySelector(".other-solutions");
    const searchBtn = document.querySelector(".search-btn");
    const resetBtn = document.querySelector(".reset-btn");
    const randomBtn = document.querySelector(".random-btn");
    let dictionary;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonFile = JSON.parse(this.responseText);
            dictionary = jsonFile.words.split(" ");
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    // ---------- EVENT LISTENERS ----------
    randomBtn.addEventListener("click", () => {
        inputCharacters.forEach((char) => {
            char.value = generateRandomChar();
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
        let results = [];
        results = findLongestWord(dictionary, randomString);
        results.length
            ? showSolutions(results, solution, otherSolutionsList)
            : alert("Nema takve reči u rečniku.");
    });
})();
