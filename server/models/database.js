const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Conexión erronea o sabrá Goku qué pasó'));
db.once('open', function(){
 console.log('Todo está listo')
});

//Modelos

require('./Category');
require('./Recipe');