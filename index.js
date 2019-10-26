const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log(err);
})

const authRoute = require('./routes/auth');
const postRoute = require('./routes/getInfoDatatable');

app.use(express.json())


app.use('/api/user', authRoute);
app.use('/api/getInfo', postRoute);

app.listen(3000, () => console.log('server are stared'));