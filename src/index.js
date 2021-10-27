const express = require('express')
const app = express()
const http = require('http').createServer(app)
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 3000
const io = require('socket.io')(http, {
    cors: { origins: ['http://localhost:8081'] }
})

app.set('json spaces', 2)

// Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(require('./routes/chat'))

// DB conection
require('./controllers/db.controller')()


// Socket controller
require('./controllers/socket.controller')(io)

http.listen(port, () => {
    console.log(`Server running on ${port}`)
})
