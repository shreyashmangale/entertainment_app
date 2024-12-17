const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config();

const uri = process.env.MONGODB_CONNECTION; // Ensure your MongoDB URI is in an environment variable

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    // Connect the client to the server
    if (!client.isConnected) {
        await client.connect();
      // console.log("Connected to MongoDB Atlas");
    }
    return client; // Return the connected client
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

connectDB();


// Gracefully close the MongoDB connection when the application exits
process.on('SIGINT', async () => {
    try {
        //console.log('Attempting to close MongoDB connection...');
        //console.log('MongoDB connection successfully closed.');
        await client.close();
        // process.exit(0);  // Exit with code 0 for a successful shutdown
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        // process.exit(1);  // Exit with error code
    }
});

// Export the connection function and client
module.exports = { connectDB, client };
