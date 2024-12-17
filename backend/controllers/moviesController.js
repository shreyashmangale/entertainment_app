const { client } = require("../dbConnection");
 
const getMovies = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        // const collection = db.collection('movies');  // Select the collection
        const collection = db.collection('all_categories_data');  // Select the collection

        // Insert a single document
        // const result = await collection.find({}).toArray();
        const result = await collection.find({contentType: 'movie'}).toArray();
        
        //console.log('Document fetched:', result);
        return res.status(200).json(result);
    } catch(error){
        throw error;
    }
}
const getMovie = async (req, res) => {
    console.log("in getMovie single");
    
    const id = req.params.id;
    console.log("id is : ", Number(id));
    
    try {
        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        const collection = db.collection('movies');  // Select the collection
        

        // Insert a single document
        const result = await collection.find({_id: Number(id)}).toArray();
        console.log(result);
        
        //console.log('Document fetched:', result);
        return res.status(200).json(result[0]);
    } catch(error){
        throw error;
    }
}

module.exports = {getMovies, getMovie}