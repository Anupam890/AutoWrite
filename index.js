import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/mongoDB.js';
import authRoute from './routes/user.authRoute.js';


import cors from 'cors';
dotenv.config();
const app = express();


const port = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

//Database Connection
connectDb().then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log(`Error: ${error.message}`);
    process.exit(1);
});



//Route Definition
app.use('/api/user/auth', authRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})