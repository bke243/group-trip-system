import { APPLICATION_PORT, APPLICATION_CONNECTION_NAME } from "./utils/index.util";
import { createConnection } from "typeorm";
import AccountEntity from "./models/AccountEntity";
import AdminEntity from "./models/AdminEntity";
import UserEntity from "./models/UserEntity";
import PersonEntity from "./models/PersonEntity";
import GroupEntity from "./models/GroupEntity";
import PackageEntity from "./models/PackageEntity";
import PurchaseDetailEntity from "./models/PurchaseDetailEntity";
import MessageEntity from "./models/MessageEntity";
import CountryEntity from "./models/CountryEntity";
import CityEntity from "./models/CityEntity";
import LocationEntity from "./models/LocationEntity";
import GroupUserEntity from "./models/GroupUserEntity";
import FeedbackEntity from './models/FeedbackEntity';
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "value",
  database: "grouptripdatabase",
  synchronize: true,
  // logging: true, // comment it to disable db logs
  entities: [
    AccountEntity, AdminEntity, UserEntity, 
    PersonEntity, GroupEntity, MessageEntity,
    CountryEntity, CityEntity, LocationEntity,
    PackageEntity, PurchaseDetailEntity, GroupUserEntity,
    FeedbackEntity
  ],
  name: APPLICATION_CONNECTION_NAME,
}).then(async (connect) => {
    // populate tables if not created  in the database
    await connect.synchronize();
    // start the application
    const server = require("./app").listen(process.env.PORT,  () => {
      console.log(`==================The application started on PORT ${process.env.PORT} ==========`);
    });
})