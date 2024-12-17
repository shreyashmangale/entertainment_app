const { client } = require("../dbConnection");



const getTrendingData = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        const collection = db.collection('trending_recommended');  // Select the collection

        // Insert a single document
        const result = await collection.find({title: 'Trending Movies'}).toArray();
        return res.status(200).json(result);
        // console.log('Document fetched:', result);
    } catch(error){
        throw error;
    }
}

module.exports = { getTrendingData }