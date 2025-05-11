const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  }, { timestamps: true });

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo