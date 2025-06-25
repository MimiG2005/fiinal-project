
import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clients.js';
import loginRoutes from './routes/login.js';
import eventRoutes from './routes/events.js';
import orderRoutes from './routes/orders.js';
import serviceTypeRoutes from './routes/service_type.js';
import providerRoutes from './routes/providers.js';
import adminRoutes from './routes/admins.js';
import areaRoutes from './routes/areas.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/service-types', serviceTypeRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/areas', areaRoutes);
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log('Server running on http://localhost:3001');
});

