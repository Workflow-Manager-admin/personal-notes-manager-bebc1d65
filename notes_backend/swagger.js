const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'Personal Notes Manager - REST API for creating, reading, updating, and deleting notes.',
    },
    components: {
      schemas: {
        Note: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier' },
            title: { type: 'string', description: 'Note title' },
            content: { type: 'string', description: 'Note content' },
            createdAt: { type: 'string', format: 'date-time', description: 'Created timestamp' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Updated timestamp' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
