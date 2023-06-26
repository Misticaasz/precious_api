// Função para obter o ID do produto a partir da URL
function getProductId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Função para fazer a requisição GET do produto pelo ID e exibir os detalhes
function fetchProductDetails() {
  const productId = getProductId();

  fetch(`https://diwserver.vps.webdock.cloud/products/${productId}`)
    .then(response => response.json())
    .then(product => {


      const productDetails = document.getElementById('productDetails');

      const col = document.createElement('div');
      col.classList.add('col-md-6', 'mx-auto');

      const card = document.createElement('div');
      card.classList.add('card');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

      const productImageContainer = document.createElement('div');
      productImageContainer.classList.add('d-flex', 'justify-content-center', 'mb-3');

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.title;
      productImage.classList.add('card-img-top', 'img-fluid');
      productImage.style.maxWidth = '258px'; // Defina o tamanho desejado da imagem aqui

      productImageContainer.appendChild(productImage);
      cardBody.appendChild(productImageContainer);

      const productName = document.createElement('h2');
      productName.classList.add('card-title');
      productName.textContent = `${product.title}`;
      cardBody.appendChild(productName);

      const productData = document.createElement('p');
      productData.classList.add('card-text');
      productData.textContent = `Data de liberação: ${product.releaseDate}`;
      cardBody.appendChild(productData);

      const productDescription = document.createElement('p');
      productDescription.classList.add('card-text');
      productDescription.innerHTML = `Descrição: ${product.description}`;
      cardBody.appendChild(productDescription);

      const productPrice = document.createElement('p');
      productPrice.classList.add('card-text');
      productPrice.textContent = `Preço: ${product.price}`;
      cardBody.appendChild(productPrice);

      card.appendChild(cardBody);
      col.appendChild(card);
      productDetails.appendChild(col);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

// Chamar a função fetchProductDetails para buscar e exibir os detalhes do produto ao carregar a página
window.addEventListener('load', fetchProductDetails);

