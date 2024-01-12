import { connect } from "http2";
import {Db, MongoClient} from "mongodb"

let Database: Db;

export default async (): Promise<Db> =>{
    if(Database) return Database;
    const Db_Client = new MongoClient(`mongodb://${process.env.MONGO_HOST}`);

    try{
        console.log("Conectou no BD!");
        await Db_Client.connect();
    }catch(Error){
        console.log("Não conectou no DB!");
        throw Error;
    }
    
    Database = Db_Client.db(process.env.MONGO_DATABASE);
    return Database;
}