const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

name: {
    type: String,
    required: 'Esto campo es requerido.'
},
image: {
    type: String,
    required: 'Este campo es requerido.'
},


});

module.exports = mongoose.model('Category', categorySchema);