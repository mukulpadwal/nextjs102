import mongoose from "mongoose";
import conf from "@/conf/conf";

export default async function connect() {
    try {
        await mongoose.connect(`${conf.mongoDbUri!}/nextJsAuth`);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log(`Successfully connected to the DataBase. On Host : ${connection.host}`)
        })

        connection.on('error', (error) => {
            console.log(`Something went wrong while connecting to the database. Kindly make sure that DB is up and running : ERROR : ${error.message}`);
            process.exit();
        })
    } catch (error: any) {
        console.log(`Error while connecting to DataBase : ERROR : ${error.message}`);

    }
}

/*
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));
*/

// REFERENCE : https://mongoosejs.com/docs/connections.html#connection-string-options