import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const DB_URI = process.env.MONGO_URI || 'mongodb+srv://kethmieperera:kat123@kattesting.xeri85k.mongodb.net/oauth-new-testing'

export default ()=>{
    mongoose.connect(`${DB_URI}`, {
        useNewUrlParser: true
      } as ConnectOptions)
    console.log('Db Connected');
      
      mongoose.connection.on("error", (e) => {
        console.error(`Error ${e}`);
      });
}