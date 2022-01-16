import { Router } from "express";
import AdminCallbacks from "../middleware-callbacks/AdminCallbacks";
import PackagesCallbacks from "../middleware-callbacks/PackagesCallbacks";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { addDummyPackages } from "../utils/database_seed";
import { CreatePackageSchema, UpdatePackageSchema } from "../utils/schemas/PackageSchema.util";

const router = Router();

// get all the dummy packages
router.get("/", PackagesCallbacks.getPackages);

// create packages
router.post("/", validateBodyParams(CreatePackageSchema), isUserAuthenticated, AdminCallbacks.isAdminUser,  PackagesCallbacks.createPackages);

// TODO , update package
router.put("/:id", validateBodyParams(UpdatePackageSchema), isUserAuthenticated, AdminCallbacks.isAdminUser, PackagesCallbacks.updatePackage);

// TODO , update package 
router.get("/:id", isUserAuthenticated, PackagesCallbacks.getPackageById);

// TODO delete 
router.delete("/:id", isUserAuthenticated, AdminCallbacks.isAdminUser,  PackagesCallbacks.deletePackageById);


// create the dummy pakages and admin, run only ones,
router.post("/dummy", addDummyPackages);




export default router;