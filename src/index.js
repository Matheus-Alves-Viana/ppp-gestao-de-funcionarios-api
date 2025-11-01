const express = require('express');
const routes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');

const app = express();
app.use(express.json());

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
