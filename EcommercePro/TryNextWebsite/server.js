
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Serve admin files
app.use('/admin', express.static('admin'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'products.html'));
});

app.get('/track-order', (req, res) => {
    res.sendFile(path.join(__dirname, 'track-order.html'));
});

app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// API endpoints for JSON data
app.get('/api/products', async (req, res) => {
    try {
        const products = await fs.readFile(path.join(__dirname, 'products.json'), 'utf8');
        res.json(JSON.parse(products));
    } catch (error) {
        console.error('Error reading products:', error);
        res.status(500).json({ error: 'Failed to load products' });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await fs.readFile(path.join(__dirname, 'categories.json'), 'utf8');
        res.json(JSON.parse(categories));
    } catch (error) {
        console.error('Error reading categories:', error);
        res.status(500).json({ error: 'Failed to load categories' });
    }
});

// Orders API endpoints
app.get('/api/orders', async (req, res) => {
    try {
        const ordersPath = path.join(__dirname, 'orders.json');
        
        // Check if orders file exists
        try {
            await fs.access(ordersPath);
        } catch {
            // Create orders file if it doesn't exist
            await fs.writeFile(ordersPath, JSON.stringify([]));
        }
        
        const orders = await fs.readFile(ordersPath, 'utf8');
        res.json(JSON.parse(orders));
    } catch (error) {
        console.error('Error reading orders:', error);
        res.status(500).json({ error: 'Failed to load orders' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = req.body;
        const ordersPath = path.join(__dirname, 'orders.json');
        
        // Read existing orders
        let orders = [];
        try {
            const ordersData = await fs.readFile(ordersPath, 'utf8');
            orders = JSON.parse(ordersData);
        } catch {
            // File doesn't exist, start with empty array
            orders = [];
        }
        
        // Add new order
        orders.push(newOrder);
        
        // Save updated orders
        await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
        
        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const ordersPath = path.join(__dirname, 'orders.json');
        
        const ordersData = await fs.readFile(ordersPath, 'utf8');
        const orders = JSON.parse(ordersData);
        
        const order = orders.find(o => o.id === orderId);
        
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error finding order:', error);
        res.status(500).json({ error: 'Failed to find order' });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedData = req.body;
        const ordersPath = path.join(__dirname, 'orders.json');
        
        const ordersData = await fs.readFile(ordersPath, 'utf8');
        const orders = JSON.parse(ordersData);
        
        const orderIndex = orders.findIndex(o => o.id === orderId);
        
        if (orderIndex !== -1) {
            orders[orderIndex] = { ...orders[orderIndex], ...updatedData };
            await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
            res.json({ success: true, order: orders[orderIndex] });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`TryneX E-commerce Platform running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
    console.log(`Admin Panel: http://localhost:${PORT}/admin`);
    console.log(`API Endpoints:`);
    console.log(`  GET /api/products - Get all products`);
    console.log(`  GET /api/categories - Get all categories`);
    console.log(`  GET /api/orders - Get all orders`);
    console.log(`  POST /api/orders - Create new order`);
    console.log(`  GET /api/orders/:id - Get specific order`);
    console.log(`  PUT /api/orders/:id - Update order`);
});
