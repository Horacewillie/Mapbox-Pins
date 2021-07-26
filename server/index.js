const express = require('express')
const mongooseConnect = require('./db/connection')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require("dotenv").config();
const PinRoute = require('./routes/pins')
const UserRoute = require('./routes/users')

const app = express()
const port = process.env.PORT || 5000


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'))
app.use(cors())

app.use('/api/pins', PinRoute)
app.use('/api/users', UserRoute)


mongooseConnect(() => {
    app.listen(port, () => {
        console.log(`SERVER LISTENING ON PORT ${port}`)
    })
})