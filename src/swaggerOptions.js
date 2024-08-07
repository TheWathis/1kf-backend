const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '1kf backend API',
    version: '1.0.0',
    description: 'Just do it ffs',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    'src/routes/educationRoute.js',
    'src/routes/hobbyRoute.js',
    'src/routes/languageRoute.js',
    'src/routes/projectRoute.js',
    'src/routes/referenceRoute.js',
    'src/routes/skillRoute.js',
    'src/routes/workExperienceRoute.js',
  ],
};
module.exports = options;