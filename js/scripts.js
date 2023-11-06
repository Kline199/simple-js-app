let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
    { name: "Beedrill", height: 0.4, types: ["bug", "poison"] },
  ];

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

    // Task 2: Add an event listener to the button
    button.addEventListener('click', function () {
      // Task 3: Call the showDetails function, passing the pokemon object as a parameter
      showDetails(pokemon);
    });
  }

  // Task 1: Create the showDetails function
  function showDetails(pokemon) {
    console.log(pokemon); 
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();


const ul = document.querySelector('.pokemon-list');

ul.innerHTML = '';

pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] });

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
