import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './config.env'});
import app from './app.js';
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(con => console.log(con.connections))
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`App running at port: ${port}, mode: ${process.env.NODE_ENV}`)
})