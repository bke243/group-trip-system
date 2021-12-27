"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AccountRoutes_1 = __importDefault(require("./routes/AccountRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
// log requests
app.use(morgan_1.default('combined'));
app.use(cors_1.default({
    origin: ['*'],
}));
// parse all the request body
app.use(body_parser_1.default.json());
app.use("/auth", AccountRoutes_1.default);
module.exports = app;
