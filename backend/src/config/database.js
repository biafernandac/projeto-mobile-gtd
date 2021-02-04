const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/makeit'; //url de conexao com o bd

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false });

module.exports = mongoose;