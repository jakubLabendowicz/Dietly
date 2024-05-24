const express = require("express");
import routes from './src/routes/Routes';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use('/api/v1', routes);

export {app};