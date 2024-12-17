const { default: mongoose } = require("mongoose");
const { client } = require("../dbConnection");
const jwt = require('jsonwebtoken');
const { ObjectId } = mongoose.Types; // Import ObjectId for type conversion


const insertData = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    // const token = req.cookies.access_token; // Extract token from cookies
    console.log("in insert to bookmarked ", token)

    try {
        const data = req.body;
        console.log(data);

        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        const collection = db.collection('bookmarked');  // Select the collection

        const result = await collection.updateOne(
            { userEmail: req.body.userEmail },
            {
                $addToSet: {
                    bookmarkedItems:
                        req.body.data

                }
            },
            { upsert: true }
        );
        // Insert a single document
        // const result = await collection.insertOne(data);
        if (result.modifiedCount) {

            res.status(201).json("Successfully added to bookmarked");
            console.log("Succesfully added to bookmarked", result);
        } else {
            res.status(409).json("Already added to bookmarked")
            console.log("Already added to bookmarked", result);

        }
    } catch (err) {
        console.log("Already added to bookmarked", err);


    }
}
const getData = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    // const token = req.cookies.access_token; // Extract token from cookies
    console.log("in get bookmarked ", token)

    try {
        if (!token) {
            return res.status(401).send('Access Denied');
        }

        jwt.verify(token, 'jwtkey', async (err, user) => {
            if (err) {
                return res.status(403).send('Invalid Token');
            }

            // console.log("In get data", token);
            console.log("In get data user", user.id);

            await client.connect();
            const db = client.db('entertainment_db');  // Select the database
            const collection = db.collection('bookmarked');  // Select the collection

            const usersCollection = db.collection('users');
            const userId = new ObjectId(user.id);

            const userData = await usersCollection.find({ _id: userId }).toArray();
            console.log("userData", userData)
            console.log("userData email", userData[0].email)

            // Insert a single document
            const result = await collection.find(
                { userEmail: userData[0].email },
                { bookmarkedItems: 1, _id: 1 } // Include bookmarkedItems, exclude MongoDB's _id
            ).toArray();
            // console.log('Document fetched:', result[0].bookmarkedItems);
            return res.status(200).json(result[0]?.bookmarkedItems)
        });


    } catch (error) {
        throw error;
    }
}
const deleteData = async (req, res) => {

    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    // const token = req.cookies.access_token; // Extract token from cookies
    console.log("in delete from bookmarked ", token)

    const id = req.params.id;
    console.log(Number(id));

    if (!token) {
        return res.status(401).send('Access Denied');
    }


    try {
        jwt.verify(token, 'jwtkey', async (err, user) => {
            if (err) {
                return res.status(403).send('Invalid Token');
            }

            // console.log("In get data", token);
            console.log("In delete data user", user.id);
            await client.connect();
            const db = client.db('entertainment_db');  // Select the database
            const collection = db.collection('bookmarked');  // Select the collection


            const usersCollection = db.collection('users');
            const userId = new ObjectId(user.id);

            const userData = await usersCollection.find({ _id: userId }).toArray();
            console.log("userData", userData)
            console.log("userData in delete email", userData[0].email)

            const bData = await collection.find(
                { userEmail: userData[0].email },
                { bookmarkedItems: 1, _id: 1 } // Include bookmarkedItems, exclude MongoDB's _id
            ).toArray();
            console.log("bData", bData)


            const result = await collection.updateOne(
                { userEmail: userData[0].email },
                { $pull: { bookmarkedItems: { _id: Number(id) } } }
            );

            // const result = await collection.deleteOne({ _id: Number(id) });
            console.log('Document deleted:', result);
            return res.status(200).json(result);
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { insertData, getData, deleteData }