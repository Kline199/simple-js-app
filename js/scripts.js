const ul = document.createElement('ul');
ul.classList.add('list-group');
ul.setAttribute('role', 'list'); // ARIA role
document.getElementById('pokemon-list').appendChild(ul);

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
    listItem.classList.add('list-group-item');
    listItem.setAttribute('role', 'listitem'); // ARIA role
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.setAttribute('aria-label', `View details of ${pokemon.name}`);
    listItem.appendChild(button);
    ul.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      const modalContent = createModalContent();

      modalContent.querySelector('#modal-name').textContent = pokemon.name;
      modalContent.querySelector('#modal-height').textContent = `Height: ${pokemon.height}`;
      modalContent.querySelector('#modal-image').src = pokemon.imgUrl;

      const modal = document.getElementById('modal');
      modal.innerHTML = '';
      modal.appendChild(modalContent);

      const closeButton = document.querySelector('.close');
      closeButton.setAttribute('data-dismiss', 'modal'); // Bootstrap approach

      $(modal).modal('show');

      window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && $(modal).is(':visible')) {
          $(modal).modal('hide');
        }
      });
    });
  }

  function loadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => response.json())
      .then((data) => {
        ul.innerHTML = '';

        data.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          addListItem(pokemon);
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

  function createModalContent() {
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close modal');
    closeButton.setAttribute('data-dismiss', 'modal'); // Bootstrap approach
    modalContent.appendChild(closeButton);

    const modalName = document.createElement('h1'); // Change from 'h2' to 'h1'
    modalName.id = 'modal-name';
    modalContent.appendChild(modalName);

    const modalHeight = document.createElement('p');
    modalHeight.id = 'modal-height';
    modalContent.appendChild(modalHeight);

    const modalImage = document.createElement('img');
    modalImage.id = 'modal-image';
    modalImage.alt = 'Pokemon Image';
    modalContent.appendChild(modalImage);

    return modalContent;
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

async function showPokemonList() {
  const pokemonList = pokemonRepository.getAll();

  if (pokemonList.length === 0) {
    await pokemonRepository.loadList();
  }

  ul.innerHTML = '';

  pokemonList.forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
}

showPokemonList();
