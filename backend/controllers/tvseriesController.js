const { client } = require("../dbConnection");

const getTvseriesAll = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        const collection = db.collection('tvseries');  // Select the collection

        // Insert a single document
        const result = await collection.find({}).toArray();
        
        //console.log('Document fetched:', result);
        return res.status(200).json(result);
    } catch(error){
        throw error;
    }
}
const getTvseriesSingle = async (req, res) => {
    console.log("in getTvseriesSingle ");
    
    const id = req.params.id;
    console.log("id is : ", Number(id));
    
    try {
        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        const collection = db.collection('tvseries');  // Select the collection
        

        // Insert a single document
        const result = await collection.find({_id: Number(id)}).toArray();
        console.log(result[0]);
        
        //console.log('Document fetched:', result);
        return res.status(200).json(result[0]);
    } catch(error){
        throw error;
    }
}

module.exports = {getTvseriesAll, getTvseriesSingle}