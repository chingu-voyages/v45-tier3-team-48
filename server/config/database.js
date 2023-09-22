const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://ChinguProject:Team48@cluster0.uinzldr.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(err){
        console.error(err);
        process.exit(1)
    }
}

const SECRET_KEY = process.env.SECRET_KEY || "secret";

module.exports = {connectDB, SECRET_KEY};