import app from "./app.js";
import { connectDB } from './dbconnect/connectDB.js';
connectDB()
const port=process.env.PORT || 7000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})