"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_util_1 = require("./utils/index.util");
const typeorm_1 = require("typeorm");
// import app from "./app";
typeorm_1.createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "blog",
    password: "blog",
    database: "iotapplication",
    synchronize: false,
    // logging: true,
    //   entities: [PersonEntity],
    name: index_util_1.APPLICATION_CONNECTION_NAME,
}).then((connect) => __awaiter(void 0, void 0, void 0, function* () {
    // populate data in the database
    yield connect.synchronize();
    // start the application
    const server = require("./app").listen(index_util_1.APPLICATION_PORT, () => {
        console.log("Application started");
    });
    // seting  upthe websocket connection
}));
