require('dotenv').config();
const { MongoClient } = require('mongodb');

// MongoDB connection URL with authentication options
let url = process.env.MONGO_URL;

let dbInstance = null;  // Cached database instance
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;  // Return cached instance if already connected
    }

    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Task 1: Connect to MongoDB
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        // Task 2: Connect to the database and cache the instance
        dbInstance = client.db(dbName);

        // Task 3: Return the database instance
        return dbInstance;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectToDatabase;  // Export the function
