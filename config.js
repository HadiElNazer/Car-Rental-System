import dotenv from 'dotenv';

dotenv.config();
const URI = 'mongodb+srv://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@cluster0.b7ddr.mongodb.net/' + process.env.DATABASE_NAME + '?retryWrites=true&w=majority';
const SECRET = process.env.SECRET;
const PORT = process.env.DATABASE_PORT;

export default {
    URI, SECRET, PORT
}