import {MongoClient} from 'mongodb'
import {getEnv} from './getEnv.js'

let cachedClient = null
let cachedDb = null

export const connectionDb = async ()=> {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }

    const client = new MongoClient('mongodb://localhost:27017')

    await client.connect()
    const db =  client.db(getEnv().db)

    cachedClient = client
    cachedDb = db

    console.log('Нове підключення до MongoDB встановлено')

    return { client, db }
}
