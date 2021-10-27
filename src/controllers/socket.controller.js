const uri = 'mongodb+srv://dbUser:mongodbuser@cluster0.6nflf.mongodb.net/'
const { MongoClient } = require('mongodb')
const client = new MongoClient(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

module.exports = function(io) {
    let usernames = []

    io.on('connection', (socket) => {
        console.log('New connection')

        socket.on('sendMessage', async (message) => {
            try {
                await client.connect()
                await client.db('chat').collection('conversation').insertOne(message)
            } catch (err) {
                console.log(err);
            } finally {
                await client.close()
            }

            io.sockets.emit('emitMessage', message)
        })

        socket.on('createUsername', async (username, cb) => {
            if (usernames.indexOf(username) != -1) {
                cb(false)
            } else {
                cb(true)
                socket.username = username
                usernames.push(socket.username)
            }
        })
    
        socket.on('disconnect', (username) => {
            console.log('Disconnected')

            if (!socket.username) {
                return
            } else {
                const index = usernames.indexOf(socket.username)
                usernames.splice(index, 1)
            } 
        })
    })
}