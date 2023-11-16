let pokemonRepository = (function () {
  let pokemonList = [];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
  }

  function addListItem(pokemon) {
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('custom-button');
    listItem.appendChild(button);
    ul.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      console.log(pokemon);
    });
  }

  function loadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((error) => {
        console.error('Error loading Pokémon list:', error);
      });
  }

  function loadDetails(pokemon) {
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        pokemon.imgUrl = data.sprites.front_default;
        pokemon.height = data.height;
      })
      .catch((error) => {
        console.error('Error loading Pokémon details:', error);
      });
  }

  const ul = document.querySelector('.pokemon-list');

  ul.innerHTML = '';

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

async function showPokemonList() {
  await pokemonRepository.loadList();
  const pokemonList = pokemonRepository.getAll();
  pokemonList.forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
}

showPokemonList();
