const express = require('express');

const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// middleware de bodyparser
app.use(express.json());

moviesApi(app);

// Catch 404
app.use(notFoundHandler);

// Los middlewares de error, siempre tienen que ir al final de las rutas, 
// las rutas también son middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port), function () {
  console.log(`Listening http localhost:${config.port}`);
};