const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({

name: {
    type: String,
    required: 'Esto campo es requerido.'
},

description: {
    type: String,
    required: 'Esto campo es requerido.'
},

email: {
    type: String,
    required: 'Esto campo es requerido.'
},

ingredients: {
    type: Array,
    required: 'Esto campo es requerido.'
},

category: {
    type: String,
    enum: ['Colombiana','China', 'Tailandesa', 'Indú', 'Mexicana','Española','Arabe','Gringa'],
    required: 'Esto campo es requerido.'
},

image: {
    type: String,
    required: 'Esto campo es requerido.'
},

});

recipeSchema.index({name: 'text', description: 'text'});

//wildcard indexacion
//recipeSchema.index({"$**": 'text'});

module.exports = mongoose.model('Recipe', recipeSchema);