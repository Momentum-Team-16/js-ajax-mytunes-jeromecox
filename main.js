const page = document.querySelector("#container");
const searchResults = document.querySelector("#search-results");

function makeCard(song) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("small");
  card.classList.add("col");
  card.classList.add("s12");
  card.classList.add("m9");
  card.classList.add("l4");

  let thumb = document.createElement("div");
  thumb.classList.add("card-image");
  let pic = document.createElement("img");
  pic.src = song.artworkUrl100;

  thumb.appendChild(pic);
  card.appendChild(thumb);

  let track = document.createElement("div");
  track.classList.add("card-content");
  let trackTitle = song.trackName;

  card.appendChild(track);

  let name = document.createElement("div");
  name.classList.add("card-title");
  let artName = song.artistName;
  name.innerText = artName;

  card.appendChild(name);

  searchResults.appendChild(card);
}

function getItunesData(term) {
  let url = "https://itunes.apple.com/search?term=" + term + "&limit=24";
  console.log(url);

  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let song of data.results) {
        makeCard(song);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

page.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchInput = document.querySelector("#search-bar").value;
  const searchValue = encodeURIComponent(searchInput);
  console.log(`Search: ${searchValue}`);

  getItunesData(searchValue);
});
