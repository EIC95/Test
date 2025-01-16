const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// GET /api/ - Search for gifts based on filters
router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();
        const collection = db.collection('gifts');

        // Build the query object
        const query = {};

        // Task 2: Check if the name exists and is not empty
        const { name, category, condition, age_years } = req.query;

        if (name && name.trim() !== '') {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search using regex
        }

        // Task 3: Add the other three filters to the query
        if (category && category.trim() !== '') {
            query.category = category;
        }

        if (condition && condition.trim() !== '') {
            query.condition = condition;
        }

        if (age_years && !isNaN(parseFloat(age_years))) {
            query.age_years = parseFloat(age_years);
        }

        // Task 4: Fetch filtered gifts
        const filteredGifts = await collection.find(query).toArray();

        // Return the filtered gifts
        res.json(filteredGifts);
    } catch (error) {
        console.error('Error searching gifts:', error);
        res.status(500).json({ error: 'An error occurred while searching for gifts' });
    }
});

module.exports = router;
