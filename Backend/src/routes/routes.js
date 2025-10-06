import express from 'express';
import { bookService, getWorkerById, ListServices, ListServicesByServiceName, user, WorkerProfile } from '../controllers/userController.js';
import { Login, Signup } from '../controllers/singup.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


router.get('/', (req, res) => res.send('Hello from backend'));
router.post('/signup',Signup)
router.post('/login',Login)
router.post('/create-worker-profile',authMiddleware,WorkerProfile)
router.get('/user',authMiddleware,user)
router.get('/List-Services',authMiddleware,ListServices)
router.get('/List-Services/:serviceName',ListServicesByServiceName)
router.post('/book-service',authMiddleware,bookService);
router.get("/worker/:id", getWorkerById);



export default router;


