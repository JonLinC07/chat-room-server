const { Router } = require('express')
const router = Router()
const uri = 'mongodb+srv://dbUser:mongodbuser@cluster0.6nflf.mongodb.net/'
const { MongoClient } = require('mongodb')
const client = new MongoClient(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

router.get('/', (req, res) => {
    res.json({ 'serverStatus': 'Online' })
})

router.get('/conversation', async (req, res) => {
    try {
        await client.connect()
        const cursor = await client.db('chat').collection('conversation').find().limit(Number.MAX_SAFE_INTEGER)
        const conversation = await cursor.toArray()
        res.json(conversation)
    } catch (err) {
        console.log(err);
    } finally {
        await client.close()
    }

})

module.exports = router
