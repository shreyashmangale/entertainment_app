const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Entertainment App',
        description: 'Capstone Project Module 5'
    },
    components: {
        securitySchemes: {
            cookieAuth: {
                type: "apiKey",
                in: "cookie",
                name: "token", // Replace with your cookie name
                description: "Cookie-based authentication using a token.",
            },
        },
    },
    security: [
        {
            cookieAuth: [], // Apply this globally to all endpoints if needed
        },
    ],
    host: 'https://entertainment-app-backend-6jyh.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/moviesRoute.js', './routes/searchRoute.js'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);