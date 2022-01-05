import { NextFunction, Request, Response, Router } from "express";
import PackageService from "../services/PackageService";
import { addDummyPackages } from "../utils/database_seed";

const router = Router();

// get all the dummy packages
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const packages = await PackageService.getPackages();
    return response.json({ packages });
    } catch (error) {
    console.log(error);
    return response.json({ error });
  }
});

// create the dummy pakages and admin, run only ones,
router.post("/", addDummyPackages);




export default router;