const uri = 'mongodb+srv://dbUser:mongodbuser@cluster0.6nflf.mongodb.net/'
const { MongoClient } = require('mongodb')

module.exports = async function() {
    const client = new MongoClient(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })

    try {
        await client.connect()
        console.log('DB online');
    } catch (err) {
        console.log(err);
    } finally {
        await client.close()
    }
    
    async function addMessage(message) {
        const result = await client.db('chat').collection('conversation').insertOne(message)
        console.log(result);
    }
}
