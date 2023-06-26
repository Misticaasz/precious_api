let currentPage = 1; // Página atual

function fetchProducts(page) {
  return fetch(`https://diwserver.vps.webdock.cloud/products?page=${page}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const products = data.products;

      // Exiba os produtos da página atual
      displayProducts(products);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Limpa o conteúdo da lista de produtos

  // Itera sobre os produtos e exibe suas informações na página
  products.forEach(product => {
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('card');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.classList.add('card-img-top');
    card.appendChild(productImage);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const productName = document.createElement('h5');
    productName.classList.add('card-title');
    productName.textContent = product.title;
    cardBody.appendChild(productName);

    const productBrand = document.createElement('p');
    productBrand.classList.add('card-text');
    productBrand.textContent = `Marca: ${product.category}`;
    cardBody.appendChild(productBrand);

    const productPrice = document.createElement('p');
    productPrice.classList.add('card-text');
    productPrice.textContent = `Preço: $${product.price}`;
    cardBody.appendChild(productPrice);

    const productLink = document.createElement('a');
    productLink.href = `detalhes.html?id=${product.id}`;
    productLink.classList.add('btn', 'btn-primary');
    productLink.textContent = 'Ver detalhes';
    cardBody.appendChild(productLink);

    card.appendChild(cardBody);
    col.appendChild(card);
    productList.appendChild(col);
  });
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts(currentPage);
  }
}

function nextPage() {
  currentPage++;
  fetchProducts(currentPage);
}

// Adiciona listeners aos botões de navegação
document.getElementById('previousButton').addEventListener('click', previousPage);
document.getElementById('nextButton').addEventListener('click', nextPage);

// Chama a função fetchProducts para buscar e exibir os produtos da página atual ao carregar a página
window.addEventListener('load', () => fetchProducts(currentPage));



//================================================= função pesquisar ====================================================================


function searchProducts() {
  const searchTerm = document.getElementById('IPTPesquisa').value;
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Limpa a lista de produtos existente

  let currentPage = 1; // Página inicial
  let foundResults = false; // Verifica se foram encontrados resultados

  // Função para buscar produtos em uma página específica
  function fetchProducts(page) {
    return fetch(`https://diwserver.vps.webdock.cloud/products?page=${page}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const products = data.products;

        // Filtra os produtos correspondentes à pesquisa
        const filteredProducts = products.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Verifica se há produtos correspondentes à pesquisa
        if (filteredProducts.length > 0) {
          foundResults = true; // Marca que foram encontrados resultados

          // Itera sobre os produtos encontrados e os exibe na página
          filteredProducts.forEach(product => {
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

            const searchButton = document.createElement('a');
            searchButton.href = `detalhes.html?id=${product.id}`;; // Defina a URL da página de pesquisa aqui
            searchButton.classList.add('btn', 'btn-primary');
            searchButton.textContent = 'Ver detalhes';

            cardBody.appendChild(title);
            cardBody.appendChild(price);
            cardBody.appendChild(searchButton);

            card.appendChild(image);
            card.appendChild(cardBody);

            col.appendChild(card);

            productList.appendChild(col);
          });
        }
      })
      .catch(error => {
        console.log('Ocorreu um erro na pesquisa:', error);
      });
  }

  // Função para buscar produtos em todas as páginas
  function searchAllProducts() {
    fetchProducts(currentPage).then(() => {
      currentPage++;
      if (currentPage <= 1214) {
        searchAllProducts();
      } else {
        // Verifica se não foram encontrados resultados
        if (!foundResults) {
          const noResultsMessage = document.createElement('p');
          noResultsMessage.textContent = 'Nenhum resultado encontrado.';
          productList.appendChild(noResultsMessage);
        }
      }
    });
  }

  searchAllProducts();
}

// Evento de envio do formulário de pesquisa
document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário
  searchProducts();
});



//================================================= função filtrar categoria ====================================================================


function BuscarCategory() {
  const category = document.getElementById("categorySelect").value;
  const productList = document.getElementById("productList");
  productList.innerHTML = '';

  fetch(`https://diwserver.vps.webdock.cloud/products/category/${category}`)
    .then(response => response.json())
    .then(data => {
      const produtos_Categoria = data.products;

      produtos_Categoria.forEach(VariavelDoForEach => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'col-md-4', 'mb-4');

        const imageElement = document.createElement('img');
        imageElement.src = VariavelDoForEach.image;
        imageElement.classList.add('card-img-top');

        const cardBodyElement = document.createElement('div');
        cardBodyElement.classList.add('card-body');

        const titleElement = document.createElement('h5');
        titleElement.textContent = VariavelDoForEach.title;
        titleElement.classList.add('card-title');

        const uso = document.createElement("p");
        uso.innerHTML = `<strong>${VariavelDoForEach.usage}</strong>`;
        uso.classList.add('card-text');

        const marca = document.createElement("p");
        marca.innerHTML = `Marca: <strong>${VariavelDoForEach.brandName}</strong>`;
        marca.classList.add('card-text');

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${VariavelDoForEach.price}`;
        priceElement.classList.add('card-text');

        const idElement = document.createElement('p');
        idElement.textContent = `ID: ${VariavelDoForEach.id}`;
        idElement.classList.add('card-text');

        const detailsButton = document.createElement('a');
        detailsButton.textContent = 'Detalhes';
        detailsButton.href = `detalhes.html?id=${VariavelDoForEach.id}`;
        detailsButton.classList.add('btn', 'btn-primary');

        cardBodyElement.appendChild(titleElement);
        cardBodyElement.appendChild(uso);
        cardBodyElement.appendChild(marca);
        cardBodyElement.appendChild(priceElement);
        cardBodyElement.appendChild(idElement);
        cardBodyElement.appendChild(detailsButton);

        cardElement.appendChild(imageElement);
        cardElement.appendChild(cardBodyElement);

        productList.appendChild(cardElement);
      });

    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}
