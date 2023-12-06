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
      // Create modal content dynamically
      const modalContent = createModalContent();

      // Update modal content
      modalContent.querySelector('#modal-name').textContent = pokemon.name;
      modalContent.querySelector('#modal-height').textContent = `Height: ${pokemon.height}`;
      modalContent.querySelector('#modal-image').src = pokemon.imgUrl;

      // Show modal
      const modal = document.getElementById('modal');
      modal.innerHTML = ''; // Clear existing content
      modal.appendChild(modalContent);
      modal.style.display = 'block';

      // Close modal when clicking on the close button
      const closeButton = document.querySelector('.close');
      closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
      });

      // Close modal when clicking outside the modal
      window.addEventListener('click', function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

      // Close modal with the 'Esc' key
      window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
          modal.style.display = 'none';
        }
      });
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

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    modalContent.appendChild(closeButton);

    const modalName = document.createElement('h2');
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

  const ul = document.createElement('ul');
  ul.classList.add('pokemon-list');
  document.body.appendChild(ul);

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
