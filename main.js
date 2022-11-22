const page = document.querySelector("#container");
const searchResults = document.querySelector("#search-results");

function makeCard(song) {
  let card = document.createElement("div");
  card.classList.add("card");
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

  let content = document.createElement("div");
  content.classList.add("card-content");
  content.classList.add("small");

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
    nowPlay.innerHTML = `Now playing: "${song.trackName}" by ${song.artistName}`;
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

  const searchBar = document.querySelector("#search-bar");
  const searchInput = searchBar.value;
  const searchValue = encodeURIComponent(searchInput);
  console.log(`Search: ${searchValue}`);

  if (searchValue === "") {
    searchBar.setCustomValidity("Please enter cool music to search");
    searchBar.reportValidity();
  } else {
    while (searchResults.firstChild) {
      searchResults.removeChild(searchResults.firstChild);
    }
    getItunesData(searchValue);
  }
});
