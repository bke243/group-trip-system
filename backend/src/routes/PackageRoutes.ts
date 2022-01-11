import { Router } from "express";
import PackagesCallbacks from "../middleware-callbacks/PackagesCallbacks";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { addDummyPackages } from "../utils/database_seed";
import { CreatePackageSchema, UpdatePackageSchema } from "../utils/schemas/PackageSchema.util";

const router = Router();

// get all the dummy packages
router.get("/", PackagesCallbacks.getPackages);

// create packages
router.post("/", validateBodyParams(CreatePackageSchema), isUserAuthenticated, PackagesCallbacks.createPackages);

// TODO , update package 
router.put("/", validateBodyParams(UpdatePackageSchema), isUserAuthenticated, PackagesCallbacks.getPackages);

// TODO , update package 
router.get("/:id", isUserAuthenticated, PackagesCallbacks.getPackageById);


// create the dummy pakages and admin, run only ones,
router.post("/dummy", PackagesCallbacks.createPackages);




export default router;