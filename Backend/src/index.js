import express from 'express';  
import config from './config/config.js';
import router from './routes/routes.js';
import cors from 'cors';
import { db } from './utils/db.js';
import cookieParser from "cookie-parser";
import cron from 'node-cron';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();

app.use(cors({
  origin: [ "https://worker-app-662a.vercel.app","https://worker-app-1.onrender.com","http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

app.use(cookieParser());
app.use('/', router);

// ✅ API to hit every 14 minutes
const targetAPI = 'https://worker-app-uoly.onrender.com';

cron.schedule('*/14 * * * *', async () => {
  try {
    const res = await axios.get(targetAPI);
    console.log('✅ Cron Job Hit API:', targetAPI, 'Response:', res.status);
  } catch (err) {
    console.error('❌ Cron Job Error:', err.message);
  }
});

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
