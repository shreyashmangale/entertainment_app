const { client } = require("../dbConnection");



const getSearchedData = async (req, res) => {
    const searched_name = req.query.searchedName;
    console.log(searched_name);

    try {
        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        const collection = db.collection('all_categories_data');  // Select the collection


        // Insert a single document
        const result = await collection.find({ title: { $regex: searched_name, $options: "i" } }).toArray();
        console.log(result[0]);

        //console.log('Document fetched:', result);
        return res.status(200).json(result);
    } catch(error){
        throw error;
    }
}


module.exports = { getSearchedData }