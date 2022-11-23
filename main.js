const page = document.querySelector("#container");
const searchResults = document.querySelector("#search-results");

page.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchBar = document.querySelector("#search-bar");
  const searchInput = searchBar.value;
  const searchValue = encodeURIComponent(searchInput);
  console.log(`Search: ${searchValue}`);

  if (searchValue === "") {
    searchBar.setCustomValidity("Please enter cool music to search");
    searchBar.reportValidity();
  } else {
    searchResults.replaceChildren();
    getItunesData(searchValue);
  }
});

function makeCard(song) {
  let card = document.createElement("div");
  card.classList.add("card", "col", "s12", "m9", "l4");

  let thumb = document.createElement("div");
  thumb.classList.add("card-image");
  let pic = document.createElement("img");
  pic.src = song.artworkUrl100;

  thumb.appendChild(pic);
  card.appendChild(thumb);

  let content = document.createElement("div");
  content.classList.add("card-content", "small");

  let track = document.createElement("div");
  track.classList.add("track-name");
  let trackTitle = song.trackName;
  track.innerText = `"${trackTitle}"`;

  content.appendChild(track);

  let name = document.createElement("div");
  name.classList.add("artist-name");
  let artName = song.artistName;
  name.innerText = artName;

  content.appendChild(name);
  card.appendChild(content);

  searchResults.appendChild(card);

  let audioDiv = document.querySelector("#audio");
  let nowPlay = document.querySelector("#nowPlay");

  card.addEventListener("click", function (event) {
    audioDiv.src = song.previewUrl;
    nowPlay.innerText = `Now playing: "${song.trackName}" by ${song.artistName}`;
  });
}

function getItunesData(term) {
  let url =
    "https://itunes.apple.com/search?term=" + term + "&limit=24&entity=song";
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
      if (data.resultCount === 0) {
        let noResults = document.createElement("p");
        noResults.classList.add("noResults");
        noResults.innerText = `No results found! 😞
      Please search again.`;
        searchResults.appendChild(noResults);
        let losingHorn = document.createElement("audio");
        searchResults.appendChild(losingHorn);
        losingHorn.src = "The_Price_is_Right_Losing_Horn.mp3";
        losingHorn.autoplay = true;
      } else {
        for (let song of data.results) {
          makeCard(song);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
