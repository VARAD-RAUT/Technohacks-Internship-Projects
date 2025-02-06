const mongoose = require('mongoose');

// Define the schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

// Create the model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
