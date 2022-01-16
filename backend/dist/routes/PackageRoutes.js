"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminCallbacks_1 = __importDefault(require("../middleware-callbacks/AdminCallbacks"));
const PackagesCallbacks_1 = __importDefault(require("../middleware-callbacks/PackagesCallbacks"));
const check_user_auth_1 = __importDefault(require("../middlewares/check-user-auth"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const database_seed_1 = require("../utils/database_seed");
const PackageSchema_util_1 = require("../utils/schemas/PackageSchema.util");
const router = (0, express_1.Router)();
// get all the dummy packages
router.get("/", PackagesCallbacks_1.default.getPackages);
// create packages
router.post("/", (0, request_body_validator_1.validateBodyParams)(PackageSchema_util_1.CreatePackageSchema), check_user_auth_1.default, AdminCallbacks_1.default.isAdminUser, PackagesCallbacks_1.default.createPackages);
// TODO , update package
router.put("/:id", (0, request_body_validator_1.validateBodyParams)(PackageSchema_util_1.UpdatePackageSchema), check_user_auth_1.default, AdminCallbacks_1.default.isAdminUser, PackagesCallbacks_1.default.updatePackage);
// TODO , update package 
router.get("/:id", check_user_auth_1.default, PackagesCallbacks_1.default.getPackageById);
// TODO delete 
router.delete("/:id", check_user_auth_1.default, AdminCallbacks_1.default.isAdminUser, PackagesCallbacks_1.default.deletePackageById);
// create the dummy pakages and admin, run only ones,
router.post("/dummy", database_seed_1.addDummyPackages);
exports.default = router;
