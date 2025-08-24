
//const cors = require('cors')
import express from 'express';
import cors from 'cors';
import aiRoutes from "./routes/ai.route.js";
import authRoutes from "./routes/auth.route.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/ai', aiRoutes);
app.use('/auth', authRoutes);

export default app;
