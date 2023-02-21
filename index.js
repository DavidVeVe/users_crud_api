const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const App = express();
const port = 3000;

App.use(cors())
App.use(express.json());
routerApi(App);

App.use(logErrors);
App.use(boomErrorHandler);
App.use(errorHandler);

App.listen(port, () => {
  console.log(`This is running on port ${port}`);
});
