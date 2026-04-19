// apps/server/src/utils/mongodb.ts
import { MongoClient, Db } from 'mongodb'

class MongoConnection {
    private static instance: MongoConnection
    private client: MongoClient
    private db: Db | null = null

    private constructor() {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
        this.client = new MongoClient(uri)
    }

    public static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection()
        }
        return MongoConnection.instance
    }

    public async getDb(): Promise<Db> {
        if (!this.db) {
            await this.client.connect()
            this.db = this.client.db('headquarters')
            console.log('Successfully connected to MongoDB')
        }
        return this.db
    }
}

export const mongoConnection = MongoConnection.getInstance()
