import { data } from "./data";
type Movie = (typeof data)[0];

const form: HTMLFormElement = document.getElementById(
  "form"
) as HTMLFormElement;
const clearNominations: HTMLButtonElement = document.getElementById(
  "clear-nominations"
) as HTMLButtonElement;
const saveNominationsButton: HTMLButtonElement = document.getElementById(
  "save-nominations-button"
) as HTMLButtonElement;

let foundedMovies: Movie[] = [];
let nominatedMovies: Movie[] = [];

function onMovieDetail(event: Event, movie: Movie) {
  event.preventDefault();
  const modalMovieDetails: HTMLDivElement = document.getElementById(
    "modal-movie-details"
  ) as HTMLDivElement;
  const title: HTMLParagraphElement = document.getElementById(
    "movie-title"
  ) as HTMLParagraphElement;
  const plot: HTMLParagraphElement = document.getElementById(
    "movie-plot"
  ) as HTMLParagraphElement;
  const buttonClose: HTMLButtonElement = document.getElementById(
    "close-modal"
  ) as HTMLButtonElement;

  title.innerText = movie.title;
  plot.innerText = movie.synopsis;

  modalMovieDetails.style.display = "block";

  buttonClose.addEventListener("click", (event) => {
    event.preventDefault();
    modalMovieDetails.style.display = "none";
  });
}

function clearNominationList() {
  const ulNominations: HTMLUListElement = document.getElementById(
    "ul-nominations"
  ) as HTMLUListElement;
  const nominations: HTMLDivElement = document.getElementById(
    "nominations"
  ) as HTMLDivElement;
  const saveNominations: HTMLElement = document.getElementById(
    "save-nominations"
  ) as HTMLElement;

  while (ulNominations.lastElementChild) {
    ulNominations.removeChild(ulNominations.lastElementChild);
  }

  nominations.style.display = "none";
  saveNominations.style.display = "none";
}

function clearPreviousSearch() {
  const ul: HTMLUListElement = document.getElementById(
    "ul"
  ) as HTMLUListElement;
  while (ul.lastElementChild) {
    ul.removeChild(ul.lastElementChild);
  }
}

function onAddMovie(event: Event, movie: Movie) {
  event.preventDefault();

  if (
    nominatedMovies?.length === 5 ||
    nominatedMovies?.findIndex((item) => item.id == movie.id) !== -1
  ) {
    return;
  }
  nominatedMovies.push(movie);

  const nominations: HTMLDivElement = document.getElementById(
    "nominations"
  ) as HTMLDivElement;
  const saveNominations: HTMLElement = document.getElementById(
    "save-nominations"
  ) as HTMLElement;

  saveNominations.style.display = "flex";
  nominations.style.display = "grid";
  const ulNominations: HTMLUListElement = document.getElementById(
    "ul-nominations"
  ) as HTMLUListElement;
  const buttonRemove: HTMLButtonElement = document.createElement(
    "button"
  ) as HTMLButtonElement;

  buttonRemove.classList.add("icon-button", "secondary");
  buttonRemove.innerHTML = `<img src="../public/cross-icon.svg" />`;

  const buttonDetails: HTMLButtonElement = document.createElement(
    "button"
  ) as HTMLButtonElement;

  buttonDetails.innerHTML = `<p class="paragraph">${movie.title}</p>`;

  const li: HTMLLIElement = document.createElement("li") as HTMLLIElement;

  li.classList.add("list-item");

  li.appendChild(buttonRemove);
  li.appendChild(buttonDetails);

  ulNominations.appendChild(li);

  buttonRemove.addEventListener("click", (event) => {
    event.preventDefault();
    ulNominations.removeChild(li);
  });
  buttonDetails.addEventListener("click", (event) =>
    onMovieDetail(event, movie)
  );
}

function showFoundedMovies(searchedValue: string) {
  const searchResults: HTMLDivElement = document.getElementById(
    "search-results"
  ) as HTMLDivElement;
  const ul: HTMLUListElement = document.getElementById(
    "ul"
  ) as HTMLUListElement;
  const resultsFor: HTMLParagraphElement = document.getElementById(
    "results-for"
  ) as HTMLParagraphElement;
  resultsFor.innerText = `Results for "${searchedValue}"`;
  searchResults.style.display = "grid";

  foundedMovies.forEach((movie, index) => {
    const li: HTMLLIElement = document.createElement("li") as HTMLLIElement;
    li.classList.add("list-item");
    const buttonAdd: HTMLButtonElement = document.createElement(
      `button-add-${index}`
    ) as HTMLButtonElement;
    const buttonDetails: HTMLButtonElement = document.createElement(
      `button-details-${index}`
    ) as HTMLButtonElement;

    const title = document.createElement("p");
    title.classList.add("paragraph");
    buttonAdd.classList.add("icon-button", "primary");

    buttonAdd.innerHTML = `<img src="../public/plus-icon.svg" />`;
    title.innerText = movie.title;
    buttonDetails.appendChild(title);

    li.appendChild(buttonAdd);
    li.appendChild(buttonDetails);

    ul.appendChild(li);

    buttonAdd.addEventListener("click", (event) => onAddMovie(event, movie));
    buttonDetails.addEventListener("click", (event) =>
      onMovieDetail(event, movie)
    );
  });
}

function search(event: Event) {
  event.preventDefault();

  let searched = "";
  for (let i = 0; i < form.length; ++i) {
    const element: HTMLInputElement = form[i] as HTMLInputElement;
    if (i === 0) searched = element.value;
    if (element.type === "text") {
      const value = element.value;
      const filteredData = data.filter((movie) => {
        return movie.title.includes(value);
      });
      foundedMovies = filteredData;
    }
  }
  clearPreviousSearch();
  showFoundedMovies(searched);
}

form.addEventListener("submit", search);
clearNominations.addEventListener("click", (event) => {
  const nominationsBanner: HTMLDivElement = document.getElementById(
    "all-nominations-banner"
  ) as HTMLDivElement;
  event.preventDefault();
  nominatedMovies = [];
  clearNominationList();
  nominationsBanner.style.display = "none";
});

saveNominationsButton?.addEventListener("click", (event) => {
  event.preventDefault();
  const nominationsBanner: HTMLDivElement = document.getElementById(
    "all-nominations-banner"
  ) as HTMLDivElement;

  nominationsBanner.style.display = "flex";
});
