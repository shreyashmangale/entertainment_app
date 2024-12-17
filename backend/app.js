const express = require('express')
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');


// MongoDB client
const client = require('./dbConnection.js')

const moviesRoute = require('./routes/moviesRoute.js')
const tvseriesRoute = require('./routes/tvseriesRoute.js')
const bookmarkedRoute = require('./routes/bookmarkedRoute.js')
const authRoutes = require('./routes/authRoutes.js')
const trendingRoute = require('./routes/trendingRoute.js')
const recommendedRoute = require('./routes/recommendedRoute.js');
const searchRoute = require('./routes/searchRoute.js')

const SwaggerUi = require('swagger-ui-express')
const SwaggerDocument = require('./swagger-output.json');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies)
}));

app.use(express.json())

app.use(cookieParser());  // Use cookie-parser middleware




// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../entertainment_website/build')));


app.use('/auth', authRoutes);
app.use('/movies', moviesRoute)
app.use('/tvseries', tvseriesRoute)
app.use('/bookmarked', bookmarkedRoute)
app.use("/search", searchRoute)
app.use('/trending', trendingRoute)
app.use('/recommended', recommendedRoute)


app.use('/api-documentation-entertainment', SwaggerUi.serve, SwaggerUi.setup(SwaggerDocument));


module.exports = app;