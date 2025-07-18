document.addEventListener('DOMContentLoaded', function() {
    initializeOrderTracking();
});

async function initializeOrderTracking() {
    // Check if order ID is in URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    if (orderId) {
        const orderIdInput = document.getElementById('order-id-input');
        if (orderIdInput) {
            orderIdInput.value = orderId;
            await trackOrder();
        }
    }

    await loadRecentOrders();

    // Set up form submission
    const trackForm = document.getElementById('track-form');
    if (trackForm) {
        trackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await trackOrder();
        });
    }
}

async function trackOrder() {
    const orderIdInput = document.getElementById('order-id-input');
    const trackingResult = document.getElementById('tracking-result');
    const orderNotFound = document.getElementById('order-not-found');

    if (!orderIdInput || !trackingResult || !orderNotFound) return;

    const orderId = orderIdInput.value.trim();

    if (!orderId) {
        showError('Please enter an order ID');
        return;
    }

    try {
        // Show loading state
        trackingResult.style.display = 'none';
        orderNotFound.style.display = 'none';

        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-tracking';
        loadingDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-gold);"></i>
                <p style="margin-top: 1rem;">Searching for your order...</p>
            </div>
        `;
        trackingResult.parentNode.insertBefore(loadingDiv, trackingResult);

        // Fetch order from server
        const response = await fetch(`https://trynex-ecommerce-2.onrender.com/api/orders/${orderId}`);

            if (!response.ok) {
                if (response.status === 404) {
                    showError('Order not found. Please check your Order ID.');
                } else {
                    throw new Error('Failed to fetch order');
                }
                return;
            }

        // Remove loading
        const loading = document.getElementById('loading-tracking');
        if (loading) loading.remove();

        if (response.ok) {
            const order = await response.json();
            displayOrderDetails(order);
        } else if (response.status === 404) {
            orderNotFound.style.display = 'block';
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        console.error('Error tracking order:', error);
        const loading = document.getElementById('loading-tracking');
        if (loading) loading.remove();
        showError('Failed to track order. Please try again.');
    }
}

function displayOrderDetails(order) {
    const trackingResult = document.getElementById('tracking-result');
    const orderNotFound = document.getElementById('order-not-found');

    orderNotFound.style.display = 'none';
    trackingResult.style.display = 'block';

    // Update order info
    document.getElementById('display-order-id').textContent = order.id;
    document.getElementById('display-order-date').textContent = formatDate(order.createdAt);
    document.getElementById('display-order-total').textContent = `৳${order.total}`;
    document.getElementById('display-order-status').textContent = getStatusText(order.status);
    document.getElementById('display-order-status').className = `order-status status-${order.status}`;

    // Update items list
    const itemsList = document.getElementById('order-items-list');
    itemsList.innerHTML = order.items.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">৳${item.price} × ${item.quantity}</div>
            </div>
            <div class="item-total">৳${item.price * item.quantity}</div>
        </div>
    `).join('');

    // Update timeline
    updateOrderTimeline(order);

    // Update summary
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>৳${order.subtotal}</span>
        </div>
        ${order.discount > 0 ? `
        <div class="summary-row">
            <span>Discount:</span>
            <span>-৳${order.discount}</span>
        </div>
        ` : ''}
        <div class="summary-row">
            <span>Delivery Fee:</span>
            <span>৳${order.deliveryFee}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>৳${order.total}</span>
        </div>
    `;

    // Show special instructions if any
    if (order.specialInstructions) {
        const instructionsDiv = document.createElement('div');
        instructionsDiv.className = 'special-instructions';
        instructionsDiv.innerHTML = `
            <h4>Special Instructions:</h4>
            <p>${order.specialInstructions}</p>
        `;
        orderSummary.appendChild(instructionsDiv);
    }
}

function updateOrderTimeline(order) {
    const timeline = document.getElementById('order-timeline');

    const statuses = [
        { key: 'pending', label: 'Order Placed', icon: 'fas fa-shopping-cart' },
        { key: 'confirmed', label: 'Order Confirmed', icon: 'fas fa-check-circle' },
        { key: 'processing', label: 'Processing', icon: 'fas fa-cogs' },
        { key: 'shipped', label: 'Shipped', icon: 'fas fa-truck' },
        { key: 'delivered', label: 'Delivered', icon: 'fas fa-box-open' }
    ];

    const currentStatusIndex = statuses.findIndex(s => s.key === order.status);

    timeline.innerHTML = statuses.map((status, index) => {
        const isCompleted = index <= currentStatusIndex;
        const isCurrent = index === currentStatusIndex;

        return `
            <div class="timeline-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                <div class="timeline-icon">
                    <i class="${status.icon}"></i>
                </div>
                <div class="timeline-content">
                    <div class="timeline-title">${status.label}</div>
                    ${isCompleted ? `<div class="timeline-date">${formatDate(order.createdAt)}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Order Placed',
        'confirmed': 'Confirmed',
        'processing': 'Processing',
        'shipped': 'Shipped',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
    };

    return statusMap[status] || 'Unknown';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

async function loadRecentOrders() {
    try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to load orders');

        const orders = await response.json();
        const recentOrders = document.getElementById('recent-orders');
        const recentList = document.getElementById('recent-list');

        if (orders.length === 0) {
            if (recentOrders) recentOrders.style.display = 'none';
            return;
        }

        if (recentList) {
            const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

            recentList.innerHTML = sortedOrders.map(order => `
                <div class="recent-item" onclick="loadOrder('${order.id}')">
                    <div class="recent-info">
                        <div class="recent-id">${order.id}</div>
                        <div class="recent-date">${formatDate(order.createdAt)}</div>
                    </div>
                    <div class="order-status status-${order.status}">
                        ${getStatusText(order.status)}
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading recent orders:', error);
        const recentOrders = document.getElementById('recent-orders');
        if (recentOrders) recentOrders.style.display = 'none';
    }
}

function loadOrder(orderId) {
    const orderIdInput = document.getElementById('order-id-input');
    if (orderIdInput) {
        orderIdInput.value = orderId;
        trackOrder();
    }
}

function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: #dc3545;
        color: white;
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

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Make functions global
window.trackOrder = trackOrder;
window.loadOrder = loadOrder;
window.contactSupport = contactSupport;
window.copyOrderId = copyOrderId;
window.printOrder = printOrder;
window.clearSearch = clearSearch;