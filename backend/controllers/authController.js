const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { client } = require("../dbConnection");


const register = async (req, res) => {
    //check existing user
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        //console.log(email, password);


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        const data = {
            username: username,
            email: email,
            normalPassword: password,
            password: hash
        }

        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        const collection = db.collection('users');  // Select the collection

        // Insert a single document
        if (await collection.findOne({ email: email })) {
            res.status(409).json("User already exists!!!!");
          //console.log("User exists already....");

        } else {

            const result = await collection.insertOne(data);
            res.status(200).json("Successfully created user")
          //console.log("Succesfully created user...", result);
        }
    } catch (err) {
      //console.log("Already exists user");

        res.status(409).json("Already exists user")

    }

}

const login = async (req, res) => {
    //check if user exists or not
    try {

        await client.connect();
        const db = client.db('entertainment_db');  // Select the database
        const collection = db.collection('users');  // Select the collection

        const email = req.body.email;
        //console.log(email, password);

        const data = await collection.findOne({ email: email })
        if (data) {
          //console.log("User present....");
          //console.log(data);

          //console.log(".........................");
            const isPassCorrect = bcrypt.compareSync(req.body.password, data.password);
          //console.log(isPassCorrect);



            if (!isPassCorrect) return res.status(400).json("Wrong username or password")

            const token = jwt.sign({ id: data._id }, "jwtkey");
            const { password, ...userData } = (data)
          //console.log(token);

            return res.status(200).json({
                userData,
                token
            });
            
        }
        else {
          //console.log("Invalid credentials");

        }
    } catch (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json("Internal server error");

    }



}

const logout = async (req, res) =>{

     // Clear the cookie containing the JWT (if using cookies)
     res.clearCookie('access_token'); // Removes the cookie from the client

     // Respond with success
     res.status(200).json({ message: 'User has been successfully logged out.' });
}


module.exports = { register, login, logout }