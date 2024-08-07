const express = require('express');

// Express app creation
const app = express()

app.use(express.json());


// Rate limiter
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100 // 100 requests per minute
});
app.use(limiter);


// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swaggerOptions');

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Routes import
const defaultRoute = require('./routes/defaultRoute');
const educationRoute = require('./routes/educationRoute');
const hobbyRoute = require('./routes/hobbyRoute');
const languageRoute = require('./routes/languageRoute');
const projectRoute = require('./routes/projectRoute');
const referenceRoute = require('./routes/referenceRoute');
const skillRoute = require('./routes/skillRoute');
const workExperienceRoute = require('./routes/workExperienceRoute');

defaultRoute(app);
educationRoute(app);
hobbyRoute(app);
languageRoute(app);
projectRoute(app);
referenceRoute(app);
skillRoute(app);
workExperienceRoute(app);


// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})