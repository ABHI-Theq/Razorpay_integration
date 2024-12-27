import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        const {connection}=await mongoose.connect(process.env.CONN_STR,{
            useNewUrlParser:true,
            useUnifiedTopology:true
            });

            console.log(`database connected to host ${connection.host}`);
    }catch(e){
        console.log(`error in db connection`);
        
    }
            
}