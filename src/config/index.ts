import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3333,
    database: {
        url: process.env.DATABASE_URL || 'mongodb://rootuser:rootpass@mongo:27017/?authMechanism=DEFAULT'
    }
};
