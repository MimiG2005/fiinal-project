
import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clients.js';
import loginRoutes from './routes/login.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/login', loginRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log('Server running on http://localhost:3001');
});

