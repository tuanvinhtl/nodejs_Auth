const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc =require('swagger-jsdoc');

const options = {
    swaggerDefinition:{
        info:{
            title:'Test API',
            version:'1.0.0',
            description:'Test Swagger API'
        },
        basePath:'/'
    },
    apis:['users-controller.js']
};

var options2 = {
    swaggerOptions: {
      url: 'http://petstore.swagger.io/v2/swagger.json'
    }
  }

const specs =swaggerJsDoc(options);

module.exports = (app) =>{
    app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(null,options2))
}