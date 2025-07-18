
// Global Variables
let products = [];
let categories = [];
let cart = [];
let currentSlide = 0;
let searchTimeout;
let currentPromoCode = null;
let orders = [];

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
async function initializeWebsite() {
    try {
        await loadData();
        initializeComponents();
        updateCartUI();
        initializeSearch();
        initializeHeroSlider();
        initializeAnimations();
        loadBannerOffers();

        console.log('TryneX website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Load all data from server
async function loadData() {
    try {
        // Load products from server
        const productsResponse = await fetch('https://trynex-ecommerce-2.onrender.com/api/products');
        products = await productsResponse.json();

        // Load categories from server
        const categoriesResponse = await fetch('https://trynex-ecommerce-2.onrender.com/api/categories');
        categories = await categoriesResponse.json();

        // Load orders from server
        const ordersResponse = await fetch('https://trynex-ecommerce-2.onrender.com/api/orders');
        if (ordersResponse.ok) {
            orders = await ordersResponse.json();
        }

        loadCategories();
        loadFeaturedProducts();

    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback data
        loadFallbackData();
    }
}

// Fallback data if server fails
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

    loadCategories();
    loadFeaturedProducts();
}

// Initialize all components
function initializeComponents() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission();
        });
    }

    // Stats animation
    animateStats();

    // Testimonials rotation
    initializeTestimonials();
}

// Advanced Search Implementation
function initializeSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    const searchSuggestions = document.getElementById('search-suggestions');

    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            clearSearchSuggestions();
        });
    }

    // Advanced search with real-time suggestions
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim().toLowerCase();

            if (query.length > 0) {
                searchTimeout = setTimeout(() => {
                    showSearchSuggestions(query);
                }, 300);
            } else {
                clearSearchSuggestions();
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }

    if (searchSubmit) {
        searchSubmit.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }

    // Close search on overlay click
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                clearSearchSuggestions();
            }
        });
    }
}

// YouTube-like search algorithm
function showSearchSuggestions(query) {
    const suggestions = generateSearchSuggestions(query);
    const searchSuggestions = document.getElementById('search-suggestions');

    if (suggestions.length > 0 && searchSuggestions) {
        searchSuggestions.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" onclick="selectSuggestion('${suggestion.text}', '${suggestion.type}', ${suggestion.id || 'null'})">
                <i class="${suggestion.icon}"></i>
                <span>${suggestion.text}</span>
                <small>${suggestion.category}</small>
            </div>
        `).join('');
        searchSuggestions.style.display = 'block';
    } else {
        clearSearchSuggestions();
    }
}

function generateSearchSuggestions(query) {
    const suggestions = [];
    const maxSuggestions = 8;

    // Search products
    products.forEach(product => {
        const score = calculateSearchScore(query, product);
        if (score > 0) {
            suggestions.push({
                text: product.name,
                category: product.category,
                icon: 'fas fa-box',
                type: 'product',
                id: product.id,
                score: score
            });
        }
    });

    // Search categories
    categories.forEach(category => {
        const score = calculateSearchScore(query, category);
        if (score > 0) {
            suggestions.push({
                text: category.name,
                category: 'Category',
                icon: category.icon,
                type: 'category',
                id: category.id,
                score: score
            });
        }
    });

    // Sort by relevance score and return top suggestions
    return suggestions
        .sort((a, b) => b.score - a.score)
        .slice(0, maxSuggestions);
}

function calculateSearchScore(query, item) {
    let score = 0;
    const queryWords = query.toLowerCase().split(' ');
    const itemText = (item.name + ' ' + (item.description || '') + ' ' + (item.category || '')).toLowerCase();

    queryWords.forEach(word => {
        if (itemText.includes(word)) {
            // Exact match in name gets highest score
            if (item.name.toLowerCase().includes(word)) {
                score += 10;
            }
            // Match in description gets medium score
            else if (item.description && item.description.toLowerCase().includes(word)) {
                score += 5;
            }
            // Match in category gets lower score
            else {
                score += 2;
            }

            // Bonus for word at beginning
            if (item.name.toLowerCase().startsWith(word)) {
                score += 5;
            }
        }
    });

    return score;
}

function selectSuggestion(text, type, id) {
    const searchInput = document.getElementById('search-input');
    const searchOverlay = document.getElementById('search-overlay');

    if (type === 'product' && id) {
        // Redirect to product
        window.location.href = `products.html?product=${id}`;
    } else if (type === 'category') {
        // Filter by category
        filterByCategory(text);
        searchOverlay.classList.remove('active');
    } else {
        // General search
        searchInput.value = text;
        performSearch(text);
    }

    clearSearchSuggestions();
}

function performSearch(query) {
    if (!query.trim()) return;

    // Redirect to products page with search
    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
}

function clearSearchSuggestions() {
    const searchSuggestions = document.getElementById('search-suggestions');
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
        searchSuggestions.innerHTML = '';
    }
}

// Load categories
function loadCategories() {
    const categoryGrid = document.getElementById('category-grid');
    const categorySelect = document.getElementById('category-select');

    if (categoryGrid) {
        categoryGrid.innerHTML = categories.map(category => `
            <div class="category-card" onclick="filterByCategory('${category.name}')">
                <div class="category-image">
                    <i class="${category.icon}"></i>
                </div>
                <div class="category-info">
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                </div>
            </div>
        `).join('');
    }

    if (categorySelect) {
        categorySelect.innerHTML = '<option value="">All Categories</option>' +
            categories.map(category => `<option value="${category.name}">${category.name}</option>`).join('');

        categorySelect.addEventListener('change', function() {
            if (this.value) {
                filterByCategory(this.value);
            }
        });
    }
}

// Load featured products
function loadFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    if (!featuredProductsGrid) return;

    const featuredProducts = products.filter(product => product.featured).slice(0, 6);

    featuredProductsGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.originalPrice > product.price ? '<span class="product-badge">Sale</span>' : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    ৳${product.price}
                    ${product.originalPrice > product.price ? `<span class="original-price">৳${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="whatsapp-btn" onclick="orderViaWhatsApp(${product.id})">
                        <i class="fab fa-whatsapp"></i>
                        WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter products by category
function filterByCategory(categoryName) {
    window.location.href = `products.html?category=${encodeURIComponent(categoryName)}`;
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartUI();
    showCartNotification(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    updateCartModal();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        updateCartModal();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartBtn = document.getElementById('cart-btn');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            openModal('cart-modal');
            updateCartModal();
        });
    }
}

function updateCartModal() {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const promoSection = document.getElementById('promo-section');
    const instructionsSection = document.getElementById('instructions-section');

    // Ensure cart modal exists
    if (!cartModal) {
        console.error('Cart modal not found');
        return;
    }

    if (cart.length === 0) {
        if (cartItems) cartItems.style.display = 'none';
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'none';
        if (promoSection) promoSection.style.display = 'none';
        if (instructionsSection) instructionsSection.style.display = 'none';
        return;
    }

    if (cartItems) cartItems.style.display = 'block';
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';
    if (promoSection) promoSection.style.display = 'block';
    if (instructionsSection) instructionsSection.style.display = 'block';

    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">৳${item.price}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    // Apply promo discount if active
    if (currentPromoCode) {
        discount = Math.round(subtotal * (currentPromoCode.discount / 100));
    }

    const deliveryFee = calculateDeliveryFee();
    const total = subtotal - discount + deliveryFee;

    // Update UI elements
    const subtotalElement = document.getElementById('cart-subtotal');
    const discountElement = document.getElementById('discount-amount');
    const promoDiscountRow = document.getElementById('promo-discount');
    const deliveryFeeElement = document.getElementById('delivery-fee');
    const totalElement = document.getElementById('cart-total');

    if (subtotalElement) subtotalElement.textContent = subtotal;
    if (discountElement) discountElement.textContent = discount;
    if (deliveryFeeElement) deliveryFeeElement.textContent = deliveryFee;
    if (totalElement) totalElement.textContent = total;

    if (promoDiscountRow) {
        promoDiscountRow.style.display = discount > 0 ? 'flex' : 'none';
    }
}

function calculateDeliveryFee() {
    // This would typically check user's address
    // For now, default to Dhaka metro area
    return 80; // ৳80 for Dhaka metro, ৳120-150 for outside Dhaka
}

// Promo Code System
function applyPromoCode() {
    const promoInput = document.getElementById('promo-code');
    const promoStatus = document.getElementById('promo-status');

    if (!promoInput || !promoStatus) return;

    const code = promoInput.value.trim().toUpperCase();

    if (!code) {
        showPromoStatus('Please enter a promo code', 'error');
        return;
    }

    // Check if code is valid
    const validPromos = {
        'WELCOME10': { discount: 10, description: '10% off on first order' },
        'SAVE20': { discount: 20, description: '20% off on orders above ৳1000' },
        'FIRSTBUY': { discount: 15, description: '15% off for new customers' }
    };

    if (validPromos[code]) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Check minimum order conditions
        if (code === 'SAVE20' && subtotal < 1000) {
            showPromoStatus('This code requires minimum order of ৳1000', 'error');
            return;
        }

        currentPromoCode = validPromos[code];
        showPromoStatus(`Promo applied! ${currentPromoCode.description}`, 'success');
        updateCartSummary();
    } else {
        showPromoStatus('Invalid promo code', 'error');
    }
}

function showPromoStatus(message, type) {
    const promoStatus = document.getElementById('promo-status');
    if (!promoStatus) return;

    promoStatus.textContent = message;
    promoStatus.className = `promo-status ${type}`;
    promoStatus.style.display = 'block';

    setTimeout(() => {
        if (type === 'error') {
            promoStatus.style.display = 'none';
        }
    }, 3000);
}

// Order Processing
async function proceedToCheckout() {
    if (cart.length === 0) return;

    // Generate unique order ID
    const orderId = generateOrderId();
    const specialInstructions = document.getElementById('special-instructions-cart')?.value || '';

    const order = {
        id: orderId,
        items: [...cart],
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        discount: currentPromoCode ? Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (currentPromoCode.discount / 100)) : 0,
        deliveryFee: calculateDeliveryFee(),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) - (currentPromoCode ? Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (currentPromoCode.discount / 100)) : 0) + calculateDeliveryFee(),
        specialInstructions: specialInstructions,
        promoCode: currentPromoCode ? currentPromoCode.code : null,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
    };

    try {
        // Save order to server
        const response = await fetch('https://trynex-ecommerce-2.onrender.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            orders.push(order);
            
            // Clear cart
            cart = [];
            currentPromoCode = null;

            // Close modal and show order confirmation
            closeModal('cart-modal');
            showOrderConfirmation(order);
            updateCartUI();
        } else {
            throw new Error('Failed to save order');
        }
    } catch (error) {
        console.error('Error saving order:', error);
        alert('Failed to process order. Please try again.');
    }
}

function generateOrderId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `TRX${timestamp.slice(-6)}${random}`;
}

function showOrderConfirmation(order) {
    // Create order confirmation modal
    const modalHTML = `
        <div class="modal active" id="order-confirmation-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Order Confirmed!</h3>
                    <button class="modal-close" onclick="closeModal('order-confirmation-modal')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="order-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h4>Thank you for your order!</h4>
                        <div class="order-details">
                            <div class="order-id">
                                <label>Order ID:</label>
                                <span id="order-id-display">${order.id}</span>
                                <button onclick="copyOrderId('${order.id}')" class="copy-btn">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <div class="order-total">
                                <label>Total Amount:</label>
                                <span>৳${order.total}</span>
                            </div>
                            <div class="estimated-delivery">
                                <label>Estimated Delivery:</label>
                                <span>${new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="next-steps">
                            <h5>What's Next?</h5>
                            <ul>
                                <li>We'll contact you shortly to confirm your order</li>
                                <li>Make payment via bKash/Nagad/Rocket</li>
                                <li>Track your order using the Order ID above</li>
                            </ul>
                        </div>
                        <div class="action-buttons">
                            <button onclick="window.location.href='track-order.html?id=${order.id}'" class="cta-btn primary">
                                <i class="fas fa-truck"></i>
                                Track Order
                            </button>
                            <button onclick="orderViaWhatsApp(null, '${order.id}')" class="cta-btn secondary">
                                <i class="fab fa-whatsapp"></i>
                                WhatsApp Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function copyOrderId(orderId) {
    navigator.clipboard.writeText(orderId).then(() => {
        // Show copied notification
        const button = event.target.closest('.copy-btn');
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            button.innerHTML = originalIcon;
        }, 2000);
    });
}

// WhatsApp Integration
function orderViaWhatsApp(productId = null, orderId = null) {
    let message = '';
    const whatsappNumber = '01747292277';

    if (orderId) {
        message = `Hi! I need support for my order ${orderId}. Please help me with the payment process.`;
    } else if (productId) {
        const product = products.find(p => p.id === productId);
        message = `Hi! I'm interested in ordering: ${product.name} (৳${product.price}). Please let me know the payment process.`;
    } else {
        message = `Hi! I'd like to place an order from TryneX. Please assist me.`;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Remove dynamic modals
        if (modalId === 'order-confirmation-modal') {
            setTimeout(() => modal.remove(), 300);
        }
    }
}

// Hero Slider
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = slideIndex - 1;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Load banner offers
function loadBannerOffers() {
    // This would load from CMS in real implementation
    const bannerOffers = document.getElementById('banner-offers');
    if (bannerOffers) {
        const offers = [
            "🎉 Welcome Offer: Get 10% off on your first order! Use code WELCOME10",
            "🚚 Free delivery on orders above ৳1000 in Dhaka Metro Area",
            "💝 Special combo offers available - Check our gift hampers!"
        ];

        let currentOffer = 0;

        function showNextOffer() {
            bannerOffers.innerHTML = `<div class="banner-offer">${offers[currentOffer]}</div>`;
            currentOffer = (currentOffer + 1) % offers.length;
        }

        showNextOffer();
        setInterval(showNextOffer, 4000);
    }
}

// Statistics Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }

    requestAnimationFrame(updateValue);
}

// Testimonials
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    setInterval(showNextTestimonial, 6000);
}

// Form Handlers
function handleNewsletterSubmission() {
    const emailInput = document.getElementById('email-input');
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');

    if (emailInput && newsletterForm && newsletterSuccess) {
        // Simulate subscription
        newsletterForm.style.display = 'none';
        newsletterSuccess.classList.add('show');

        // Reset after 5 seconds
        setTimeout(() => {
            newsletterForm.style.display = 'block';
            newsletterSuccess.classList.remove('show');
            emailInput.value = '';
        }, 5000);
    }
}

function handleContactFormSubmission() {
    const form = document.getElementById('contact-form');
    const button = form.querySelector('button');

    // Simulate form submission
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        form.reset();

        // Show success message
        alert('Thank you! Your message has been sent successfully.');
    }, 2000);
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showCartNotification(productName) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-gold);
        color: var(--primary-black);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: var(--z-tooltip);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transform: translateX(100%);
        transition: var(--transition);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize animations
function initializeAnimations() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.category-card, .product-card, .stat-card, .badge').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Handle escape key for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }

        const searchOverlay = document.getElementById('search-overlay');
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            clearSearchSuggestions();
        }
    }
});

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.orderViaWhatsApp = orderViaWhatsApp;
window.filterByCategory = filterByCategory;
window.openModal = openModal;
window.closeModal = closeModal;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.scrollToSection = scrollToSection;
window.applyPromoCode = applyPromoCode;
window.proceedToCheckout = proceedToCheckout;
window.copyOrderId = copyOrderId;
window.selectSuggestion = selectSuggestion;
