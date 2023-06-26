// Variáveis de controle da paginação
let currentPage = 1; // Página atual
const productsPerPage = 9; // Número de produtos exibidos por página
let filteredProducts = []; // Array para armazenar os produtos filtrados

// Função para realizar a pesquisa
function searchProducts(searchTerm) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = ''; // Limpa os resultados de pesquisa existentes

  // Faz uma requisição GET para a API Fake Store
  fetch(`https://diwserver.vps.webdock.cloud/products/search?query=${searchTerm}`)
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      console.log(data);
      filteredProducts = data.products;

      // Verifica se há produtos correspondentes à pesquisa
      if (filteredProducts.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'Nenhum resultado encontrado.';
        searchResults.appendChild(noResultsMessage);
      } else {
        // Exibe os produtos da página atual
        displayProducts();
      }
    })
    .catch(error => {
      console.log('Ocorreu um erro na pesquisa:', error);
    });
}

// Função para exibir os produtos da página atual
function displayProducts() {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  // Calcula o índice inicial e final dos produtos na página atual
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Obtém os produtos da página atual
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Itera sobre os produtos encontrados e os exibe na página
  paginatedProducts.forEach(product => {
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = product.image;
    image.classList.add('card-img-top');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.classList.add('card-text');
    price.textContent = `Price: $${product.price}`;

    cardBody.appendChild(title);
    cardBody.appendChild(price);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    searchResults.appendChild(col);
  });

  // Atualiza os botões de navegação
  updateNavigationButtons();
}

// Função para atualizar os botões de navegação
function updateNavigationButtons() {
  const previousButton = document.getElementById('previousButton');
  const nextButton = document.getElementById('nextButton');

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage * productsPerPage >= filteredProducts.length;
}

// Evento de envio do formulário de pesquisa
document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  const searchTerm = document.getElementById('IPTPesquisa').value;
  currentPage = 1; // Reinicia a página atual ao realizar uma nova pesquisa
  searchProducts(searchTerm);
});

// Evento de clique no botão "Anterior"
document.getElementById('previousButton').addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
});

// Evento de clique no botão "Próxima"
document.getElementById('nextButton').addEventListener('click', function() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts();
  }
});

