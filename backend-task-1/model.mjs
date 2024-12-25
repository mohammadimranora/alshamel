import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    createdOn: { type: Date, default: Date.now },
    dueDate: { type: Date },
    assignee: { type: String },
    status: {
        type: String,
        enum: ['To Do', 'In Development', 'Completed'],
        default: 'To Do'
    },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
