import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/userModel.js';
import Product from './models/productModal.js';
import Order from './models/orderModel.js';

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bsOomStore', {
    // Removed deprecated options
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Read and parse data file
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

// Seed database function
const seedDatabase = async () => {
    try {
        // Delete existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
    
        // Insert new data
        console.log('Inserting users:', data.users);
        console.log('Inserting products:', data.products);
        console.log('Inserting orders:', data.orders);
    
        await User.insertMany(data.users);
        await Product.insertMany(data.products);
        await Order.insertMany(data.orders);
    
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Ensure connection is closed
        mongoose.connection.close();
    }
};

// Execute the seed function
seedDatabase();
