import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './connection.mjs';
import tasks from './task.mjs';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', tasks);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});

