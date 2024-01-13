import mongoose, { Connection, Mongoose } from "mongoose";
let database: Connection;

export default async (): Promise<Connection> => {
    if (database) return database //If de uma linha = if(){}

    try {
        const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/api_streaming"

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