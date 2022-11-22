const page = document.querySelector("#container");
const searchInput = document.querySelector("search-bar");
const searchResults = document.querySelector("#search-results");

function getItunesData() {
  let url = "https://itunes.apple.com/search?" + searchInput.value;

  fetch(url)
    .then((data) => data.json())
    .then((json) => {
      console.log(json);
    })

    .catch((error) => console.log(error));
}

page.addEventListener("submit", function (event) {
  event.preventDefault();

  // let search;

  // let card = document.createElement("div");
  // card.classList.add("card");
  // card.classList.add("small");
  // card.classList.add("col");
  // card.classList.add("s12");
  // card.classList.add("m9");
  // card.classList.add("l4");

  // let thumb = document.createElement("div");
  // thumb.classList.add("card-image");
  // let pic = document.createElement("img");
  // // pic.src = albumArt;

  // thumb.appendChild(pic);
  // card.appendChild(thumb);

  // let track = document.createElement("div");
  // track.classList.add("card-content");
  // // let trackTitle = importObject.trackName;

  // card.appendChild(track);

  // let name = document.createElement("div");
  // name.classList.add("card-title");
  // let artName = importObject.results.artistName;
  // // name.innerText = artName;

  // card.appendChild(name);

  // searchDiv.appendChild(card);
});
