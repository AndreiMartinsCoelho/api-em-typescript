import mongoose, { Connection, Mongoose } from "mongoose";
import dotenv from 'dotenv'
let database: Connection;

dotenv.config()

export default async (): Promise<Connection> => {
    if (database) return database //If de uma linha = if(){}

    try {
        const mongoURL = process.env.MONGO_URL

        // Conectando ao banco usando Mongoose
        const mongooseInstance: Mongoose = mongoose
        await mongooseInstance.connect(mongoURL)
        console.log("Conectou ao DB!")

        database = mongooseInstance.connection
        return database
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error)
        throw error
    }
}