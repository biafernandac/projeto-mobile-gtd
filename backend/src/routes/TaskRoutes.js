const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
//const MacaddressValidation = require('../middlewares/MacaddressValidation');

router.post('/', TaskValidation, TaskController.create); //criar
router.put('/:id', TaskValidation,  TaskController.update); //atualizar
router.get('/:id', TaskController.show); //mostrar uma tarefa
router.delete('/:id', TaskController.delete); //deletar
router.put('/:id/:done', TaskController.done);

router.get('/filter/all/:macaddress', TaskController.all); //filtrar todos
router.get('/filter/late/:macaddress', TaskController.late);
router.get('/filter/today/:macaddress', TaskController.today);
router.get('/filter/week/:macaddress', TaskController.week);
router.get('/filter/month/:macaddress', TaskController.month);
router.get('/filter/year/:macaddress', TaskController.year);
router.get('/filter/taskDone/:macaddress', TaskController.taskDone);

module.exports = router;