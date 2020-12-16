const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

const port = process.env.PORT || 8000;
console.log(port)
app.listen(port, () => {
	console.log(`App running at port : ${port}`)
})