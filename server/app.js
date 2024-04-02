import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';  
import apiRoutes from './routes/api.js'; 


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/projects', projectRoutes);
app.use('/api', apiRoutes);

console.log(process.env.MONGODB_URI);
await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'projectsDB'
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
