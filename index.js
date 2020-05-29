//Initial config
const express = require("express");
const bodyParser = require("body-parser");
const guitarRouter = require("./api/recursos/guitars/guitar.routes");
const logger = require('./utils/logger')
const morgan = require('morgan')

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(morgan('short', {
    stream: {
        write: message => logger.info(message)
    }
}));
app.use("/guitars", guitarRouter);

app.get("/", (req, res) => {
  res.json("API de ENC");
});

app.listen(3000, () => {
  logger.info("Escuchando en el puerto 3000");
});
