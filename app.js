console.log("You are connected...");

document.addEventListener("DOMContentLoaded", () => {
  let generateBtn = document.querySelector("#generate-pokemon");
  generateBtn.addEventListener("click", renderAll);
  getDeleteBtn().addEventListener("click", deleteAll);
});

function renderAll() {
  let allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerText = "";
  fetchKantoPokemon();

  getDeleteBtn().style.display = "block";
}

function getDeleteBtn() {
  return document.querySelector("#delete-btn");
}

function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach(function (pokemon) {
        fetchPokemonData(pokemon);
      });
    });
}

function fetchPokemonData(pokemon) {
  // Save Pokemon url to variable to use in fetch. Example: https://pokeapi.co/api/v2/pokemon/1/
  let url = pokemon.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      renderPokemon(pokeData);
    });
}

function renderPokemon(pokeData) {
  let allPokemonContainer = document.getElementById("poke-container");
  let pokeContainer = document.createElement("div"); //div contains data for indiviual pokemon card.
  pokeContainer.classList.add("ui", "card");

  createPokeImage(pokeData.id, pokeContainer);

  let pokeName = document.createElement("h4");
  pokeName.innerText = pokeData.name;

  let pokeNumber = document.createElement("p");
  pokeNumber.innerText = `#${pokeData.id}`;

  let pokeTypes = document.createElement("ul"); //ul list contains pokemon types

  createTypes(pokeData.types, pokeTypes); // helper function to go through the types array and create li tags for each one
  pokeContainer.append(pokeName, pokeNumber, pokeTypes); //appending all details to the pokeContainer div
  allPokemonContainer.appendChild(pokeContainer); //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

function createTypes(types, ul) {
  types.forEach(function (type) {
    let typeLi = document.createElement("li");
    typeLi.innerText = type["type"]["name"];
    ul.append(typeLi);
  });
}

function createPokeImage(pokeID, containerDiv) {
  let pokeImgContainer = document.createElement("div");
  pokeImgContainer.classList.add("image");

  let pokeImage = document.createElement("img");
  pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;

  pokeImgContainer.append(pokeImage);
  containerDiv.append(pokeImgContainer);
}

function deleteAll(event) {
  event.target.style = "none";
  let allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerText = "";

  let generateBtn = document.createElement("button");
  generateBtn.innerText = "Generate Pokemon";
  generateBtn.id = "generate-pokemon";
  generateBtn.classList.add("ui", "secondary", "button");
  generateBtn.addEventListener("click", renderAll);

  allPokemonContainer.append(generateBtn);
}
