import dotenv from 'dotenv';

dotenv.config();
const uri = 'mongodb+srv://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@cluster0.b7ddr.mongodb.net/' + process.env.DATABASE_NAME + '?retryWrites=true&w=majority';
const secret = process.env.SECRET;
const port = process.env.DATABASE_PORT;

export default {
    uri, secret, port
}