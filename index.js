const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require("./middlewares/error.handler");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
