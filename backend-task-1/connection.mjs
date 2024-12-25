import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DATABASE_URI)
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Database connection error:', err));
