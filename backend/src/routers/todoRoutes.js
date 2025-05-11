const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require('../controllers/todoControllers');

router.post('/addtodo', authMiddleware, createTodo);
router.get('/todos', authMiddleware, getTodos);
router.put('/edit/:id', authMiddleware, updateTodo);
router.delete('/delete/:id', authMiddleware, deleteTodo);

module.exports = router;
