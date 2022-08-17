const express = require('express')
const bodyParser = require('body-parser')
const database = require("./config/database");
const cors = require('cors');
const routes = require('./routes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());
app.options("*", cors());

app.use(routes);


database.raw('select 1+1 as result')
.then(() => {
    console.log('Connection to database has been established successfully.');

    app.listen(process.env.PORT || 4000, () => console.log('Listening....'))
})
.catch(err => { 
    console.log(err);
    process.exit(1);
  });
