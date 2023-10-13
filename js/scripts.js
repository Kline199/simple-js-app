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

  return {
    getAll: getAll,
    add: add,
  };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] });

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 1.0) {
    document.write(
      pokemon.name +
        " (height: " +
        pokemon.height +
        ") - Wow. That's big!<br>"
    );
  } else {
    document.write(
      pokemon.name +
        " (height: " +
        pokemon.height +
        ")<br>"
    );
  }
});

