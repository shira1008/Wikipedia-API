const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultDOM = document.querySelector(".results");

formDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputDOM.value;
  if (!value) {
    resultDOM.innerHTML = `<div class="error">please enter a value </div>`;
    return;
  }
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  resultDOM.innerHTML = `<div class="loading"> </div>`;
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      resultDOM.innerHTML = `<div class="error">no results, try again </div>`;
      return;
    }

    renderResults(results);
  } catch (error) {
    resultDOM.innerHTML = `<div class="error">there was an error </div>`;
    return;
  }
};

//add the 20 results to the page ,and by click go to a result wiki page => in the href
const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      // console.log(item);
      const { title, snippet, pageid } = item;

      return `  <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h4> ${title} </h4>
            <p>
            ${snippet}
            </p>
          </a>`;
    })
    .join("");
  resultDOM.innerHTML = `<div class="articles">
    ${cardsList}
    </div>`;
};
