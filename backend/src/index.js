const express = require('express'); //carrega todas as pastas do express
const TaskController = require('./controller/TaskController');
const server = express(); //inicializa o servidor

server.use(express.json());

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes);

server.listen(3000, () => {
    console.log('API ONLINE');
});
