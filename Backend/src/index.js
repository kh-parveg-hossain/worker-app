import express from 'express';  
import config from './config/config.js';
import router from './routes/routes.js';
import cors from 'cors';
import { db } from './utils/db.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();
app.use(cors({
  origin: [ "https://worker-app-uoly.onrender.com","http://localhost:5173"], // your React frontend URLs
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

 app.use('/', router);
app.use(cookieParser());


app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});