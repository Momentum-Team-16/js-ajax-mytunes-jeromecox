const page = document.querySelector("#container");
const searchInput = document.querySelector("#search-bar");
const searchResults = document.querySelector("#search-results");

page.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log(`Search: ${searchInput.value}`);

  function getItunesData() {
    let url = "https://itunes.apple.com/search?" + searchInput.value;

    fetch(url)
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
      })

      .catch((error) => console.log(error));
  }

  getItunesData();
  //

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
  // pic.src = ${song.artworkUrl100};

  // thumb.appendChild(pic);
  // card.appendChild(thumb);

  // let track = document.createElement("div");
  // track.classList.add("card-content");
  // let trackTitle = ${song.trackName};

  // card.appendChild(track);

  // let name = document.createElement("div");
  // name.classList.add("card-title");
  // let artName = ${song.artistName};
  // name.innerText = artName;

  // card.appendChild(name);

  // searchDiv.appendChild(card);
});
