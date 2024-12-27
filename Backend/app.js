import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import Razorpay from 'razorpay'
import router from './routes/paymentRoute.js';
import cors from 'cors';





export const instance=new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})

// Create an Express app 
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

app.get('/api/getKey', (req, res) => {
    // Ensure the environment variable is loaded
    if (!process.env.RAZORPAY_KEY) {
        return res.status(500).json({ error: 'RAZORPAY_KEY is not defined' });
    }
    res.status(200).json({ key: process.env.RAZORPAY_KEY });
});

// Export the app
export default app;
