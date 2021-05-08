const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    foodtitle: { type: String, required: true},
    description: { type: String, required: false},
    inputfile: {type: String, required: false},
    category: { type: String, required: false},
    //time: { type: Number, required: false},
    ingredients: { type: String, required: false},
    instructions: { type: String, required: false}
});

module.exports = mongoose.model('Recipe', recipeSchema);
