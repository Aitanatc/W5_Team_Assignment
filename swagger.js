const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'W5_Team_Assignment',
    description: 'CSE Project',
  },
  host: 'localhost:3000',

  schemes: ['https'],
  schemes : ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);