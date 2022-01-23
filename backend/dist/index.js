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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_util_1 = require("./utils/index.util");
const typeorm_1 = require("typeorm");
const AccountEntity_1 = __importDefault(require("./models/AccountEntity"));
const AdminEntity_1 = __importDefault(require("./models/AdminEntity"));
const UserEntity_1 = __importDefault(require("./models/UserEntity"));
const PersonEntity_1 = __importDefault(require("./models/PersonEntity"));
const GroupEntity_1 = __importDefault(require("./models/GroupEntity"));
const PackageEntity_1 = __importDefault(require("./models/PackageEntity"));
const PurchaseDetailEntity_1 = __importDefault(require("./models/PurchaseDetailEntity"));
const MessageEntity_1 = __importDefault(require("./models/MessageEntity"));
const CountryEntity_1 = __importDefault(require("./models/CountryEntity"));
const CityEntity_1 = __importDefault(require("./models/CityEntity"));
const LocationEntity_1 = __importDefault(require("./models/LocationEntity"));
const GroupUserEntity_1 = __importDefault(require("./models/GroupUserEntity"));
const FeedbackEntity_1 = __importDefault(require("./models/FeedbackEntity"));
(0, typeorm_1.createConnection)({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "farhadich",
    password: "jff08021997",
    database: "grouptripdatabase",
    synchronize: true,
    logging: true,
    entities: [
        AccountEntity_1.default, AdminEntity_1.default, UserEntity_1.default,
        PersonEntity_1.default, GroupEntity_1.default, MessageEntity_1.default,
        CountryEntity_1.default, CityEntity_1.default, LocationEntity_1.default,
        PackageEntity_1.default, PurchaseDetailEntity_1.default, GroupUserEntity_1.default,
        FeedbackEntity_1.default
    ],
    name: index_util_1.APPLICATION_CONNECTION_NAME,
}).then((connect) => __awaiter(void 0, void 0, void 0, function* () {
    // populate tables if not created  in the database
    yield connect.synchronize();
    // start the application
    const server = require("./app").listen(index_util_1.APPLICATION_PORT, () => {
        console.log("==================The application started==========");
    });
}));
