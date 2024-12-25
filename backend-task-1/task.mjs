import Task from './model.mjs';
import express from 'express';

const tasks = express.Router();

tasks.post('/tasks', async (req, res) => {
    try {
        const taskData = req.body;
        const task = new Task(taskData);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: `Error creating task: ${error.message}` });
    }
});

tasks.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: `Task not found` });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: `Error fetching task: ${error.message}` });
    }
});

tasks.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: `Task not found` });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: `Error updating task: ${error.message}` });
    }
});

tasks.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: `Task not found` });
        }
        res.status(200).json({ message: `Task deleted` });
    } catch (error) {
        res.status(500).json({ message: `Error deleting task: ${error.message}` });
    }
});

tasks.get('/tasks', async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const parsedLimit = Math.min(Number(limit), 100);
        const parsedPage = Math.max(Number(page), 1);

        const searchFilter = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        } : {};

        const tasks = await Task.find(searchFilter)
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit)
            .exec();

        const totalTasks = await Task.countDocuments(searchFilter);

        res.status(200).json({
            tasks,
            totalTasks,
            totalPages: Math.ceil(totalTasks / parsedLimit),
            currentPage: parsedPage
        });
    } catch (error) {
        res.status(500).json({ message: `Error fetching tasks: ${error.message}` });
    }
});

export default tasks;
