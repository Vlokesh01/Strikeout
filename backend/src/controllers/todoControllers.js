const Todo = require('../models/todoModel');

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({
            userId: req.user.id,
            title,
            description,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create todo' });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch todos' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { title, description, status },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update todo' });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete todo' });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
