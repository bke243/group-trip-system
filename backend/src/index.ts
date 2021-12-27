import { APPLICATION_PORT, APPLICATION_CONNECTION_NAME } from "./utils/index.util";
import { createConnection } from "typeorm";
import AccountEntity from "./models/AccountEntity";
import { join } from "path/posix";

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "blog",
  database: "iotapplication",
  synchronize: false,
  logging: true,
  entities: [join(__dirname, "./models/*.ts")],
  name: APPLICATION_CONNECTION_NAME,
}).then(async (connect) => {
    // populate data in the database
    await connect.synchronize();
    // start the application
    const server = require("./app").listen(APPLICATION_PORT,  () => {
        console.log("Application started");
    });
    // seting  upthe websocket connection
})