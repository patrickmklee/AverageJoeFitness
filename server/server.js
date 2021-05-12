const express = require('express');
// const routes = require('./routes');
// const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
// app.use(routes);


app.listen(PORT, () => console.log('Now listening'));
