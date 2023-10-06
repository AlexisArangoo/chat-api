// import express from 'express';
const express = require('express'); // cjs -common java script
const morgan = require('morgan');
const cors = require('cors')
const path = require('node:path')
const errorRoutes = require('./routes/error.routes');
const apiv1Routes = require('./routes/apiv1.routes');
require('dotenv').config


const PORT = process.env.PORT ?? 8000

const app = express();



app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/avatar', express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.send('ok')
})


apiv1Routes(app)

errorRoutes(app)

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})