import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import Db from "./db/db.js";

const Port = process.env.PORT || 8000;

Db().then(() => {
  app.listen(Port, () => {
    console.log(`Server Running on Port ${Port}`);
  });
});

