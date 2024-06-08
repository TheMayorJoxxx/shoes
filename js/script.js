document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');

    fetch('data/productos.json')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            setupFilters(data);
            setupPriceFilter(data);
            setupSearchFilter(data);
        });

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
            `;
            productList.appendChild(productElement);
        });
    }

    function setupFilters(products) {
        const filterLinks = document.querySelectorAll('aside nav ul li a');
        filterLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const filter = this.getAttribute('data-filter');
                const filteredProducts = filter === 'all' ? products : products.filter(product => product.category === filter);
                displayProducts(filteredProducts);
            });
        });
    }

    function setupPriceFilter(products) {
        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');

        priceRange.addEventListener('input', function () {
            const maxPrice = parseInt(this.value, 10);
            priceValue.textContent = `$${maxPrice}`;
            const filteredProducts = products.filter(product => product.price <= maxPrice);
            displayProducts(filteredProducts);
        });
    }

    function setupSearchFilter(products) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm));
            displayProducts(filteredProducts);
        });
    }
});
