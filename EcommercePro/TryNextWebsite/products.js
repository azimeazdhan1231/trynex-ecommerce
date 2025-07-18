
// Products page specific functionality
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
});

async function initializeProductsPage() {
    try {
        // Load data if not already loaded
        if (products.length === 0) {
            await loadData();
        }

        initializeFilters();
        setupEventListeners();
        processUrlParameters();
        applyFilters();
        setupBackToTop();

    } catch (error) {
        console.error('Error initializing products page:', error);
        loadFallbackData();
        initializeFilters();
        setupEventListeners();
        applyFilters();
    }
}

async function loadData() {
    try {
        // Load products from server
        const productsResponse = await fetch('https://trynex-ecommerce-2.onrender.com/api/products');
        products = await productsResponse.json();

        // Load categories from server
        const categoriesResponse = await fetch('https://trynex-ecommerce-2.onrender.com/api/categories');
        categories = await categoriesResponse.json();

    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}

function loadFallbackData() {
    products = [
        {
            id: 1,
            name: "Premium Ceramic Mug",
            name_bn: "প্রিমিয়াম সিরামিক মগ",
            category: "Mugs",
            price: 550,
            originalPrice: 650,
            image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
            description: "High-quality ceramic mug perfect for coffee lovers",
            description_bn: "কফি প্রেমীদের জন্য উচ্চ মানের সিরামিক মগ",
            featured: true,
            inStock: true,
            rating: 4.8
        },
        {
            id: 2,
            name: "Comfort T-Shirt",
            name_bn: "কমফোর্ট টি-শার্ট",
            category: "T-Shirts",
            price: 550,
            originalPrice: 650,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            description: "Soft and comfortable premium cotton t-shirt",
            description_bn: "নরম এবং আরামদায়ক প্রিমিয়াম সুতির টি-শার্ট",
            featured: true,
            inStock: true,
            rating: 4.7
        }
    ];

    categories = [
        { id: 1, name: "Mugs", name_bn: "মগ", icon: "fas fa-coffee", description: "Premium ceramic mugs starting from ৫৫০৳" },
        { id: 2, name: "T-Shirts", name_bn: "টি-শার্ট", icon: "fas fa-tshirt", description: "Comfortable t-shirts starting from ৫৫০৳" }
    ];
}

function initializeFilters() {
    const categoryFilter = document.getElementById('category-filter');

    if (categoryFilter && categories.length > 0) {
        categoryFilter.innerHTML = '<option value="">All Categories</option>' +
            categories.map(category => `<option value="${category.name}">${category.name}</option>`).join('');
    }
}

function setupEventListeners() {
    // Filter change events
    const categoryFilter = document.getElementById('category-filter');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const sortFilter = document.getElementById('sort-filter');
    const clearFilters = document.getElementById('clear-filters');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }

    if (priceMin) {
        priceMin.addEventListener('input', debounce(applyFilters, 500));
    }

    if (priceMax) {
        priceMax.addEventListener('input', debounce(applyFilters, 500));
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }

    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }

    // View toggle
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');

    if (gridView) {
        gridView.addEventListener('click', () => setView('grid'));
    }

    if (listView) {
        listView.addEventListener('click', () => setView('list'));
    }
}

function processUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);

    // Handle category filter
    const category = urlParams.get('category');
    if (category) {
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = category;
        }
    }

    // Handle search query
    const search = urlParams.get('search');
    if (search) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = search;
        }

        // Update page title
        document.title = `Search: ${search} - TryneX`;
    }

    // Handle specific product
    const productId = urlParams.get('product');
    if (productId) {
        highlightProduct(parseInt(productId));
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');

    // Get filter values
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const minPrice = priceMin ? parseFloat(priceMin.value) || 0 : 0;
    const maxPrice = priceMax ? parseFloat(priceMax.value) || Infinity : Infinity;
    const sortBy = sortFilter ? sortFilter.value : 'name';
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Filter products
    filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategory && product.category !== selectedCategory) {
            return false;
        }

        // Price filter
        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }

        // Search filter
        if (searchQuery) {
            const searchFields = [
                product.name,
                product.description,
                product.category,
                product.name_bn || '',
                product.description_bn || ''
            ].join(' ').toLowerCase();

            const searchWords = searchQuery.split(' ');
            const matches = searchWords.every(word => searchFields.includes(word));

            if (!matches) {
                return false;
            }
        }

        return true;
    });

    // Sort products
    sortProducts(filteredProducts, sortBy);

    // Reset to first page
    currentPage = 1;

    // Render products
    renderProducts();
    renderPagination();
    updateResultsCount();
}

function sortProducts(products, sortBy) {
    switch (sortBy) {
        case 'name':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            products.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'newest':
            products.sort((a, b) => (b.id || 0) - (a.id || 0));
            break;
    }
}

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');

    if (!productsGrid) return;

    // Calculate pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);

    if (pageProducts.length === 0) {
        productsGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }

    productsGrid.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';

    productsGrid.innerHTML = pageProducts.map(product => `
        <div class="product-card ${currentView === 'list' ? 'list-view' : ''}" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.originalPrice > product.price ? '<span class="product-badge">Sale</span>' : ''}
                ${!product.inStock ? '<span class="product-badge" style="background: #dc3545;">Out of Stock</span>' : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                ${product.rating ? `
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                ` : ''}
                <div class="product-price">
                    ৳${product.price}
                    ${product.originalPrice > product.price ? `<span class="original-price">৳${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="whatsapp-btn" onclick="orderViaWhatsApp(${product.id})">
                        <i class="fab fa-whatsapp"></i>
                        WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add animation to product cards
    const productCards = productsGrid.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'flex';

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="changePage(${i})" ${i === currentPage ? 'class="active"' : ''}>
                ${i}
            </button>
        `;
    }

    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderProducts();
    renderPagination();

    // Scroll to top of products
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (!resultsCount) return;

    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, filteredProducts.length);

    if (filteredProducts.length === 0) {
        resultsCount.textContent = 'No products found';
    } else {
        resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${filteredProducts.length} products`;
    }
}

function setView(view) {
    currentView = view;

    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const productsGrid = document.getElementById('products-grid');

    if (gridViewBtn && listViewBtn && productsGrid) {
        gridViewBtn.classList.toggle('active', view === 'grid');
        listViewBtn.classList.toggle('active', view === 'list');

        productsGrid.classList.toggle('list-view', view === 'list');

        // Re-render products with new view
        renderProducts();
    }
}

function clearAllFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');

    if (categoryFilter) categoryFilter.value = '';
    if (priceMin) priceMin.value = '';
    if (priceMax) priceMax.value = '';
    if (sortFilter) sortFilter.value = 'name';
    if (searchInput) searchInput.value = '';

    // Clear URL parameters
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);

    applyFilters();
}

function highlightProduct(productId) {
    // Ensure the product is visible and highlighted
    setTimeout(() => {
        const productCard = document.querySelector(`[data-id="${productId}"]`);
        if (productCard) {
            productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            productCard.style.animation = 'highlight 2s ease-in-out';
        }
    }, 500);
}

function setupBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions global
window.changePage = changePage;

// Add highlight animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        50% { transform: scale(1.02); box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3); }
    }

    .original-price {
        text-decoration: line-through;
        color: var(--text-light);
        font-size: 0.9em;
        margin-left: 0.5rem;
    }

    .product-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: var(--primary-gold);
    }

    .product-rating span {
        color: var(--text-light);
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);
