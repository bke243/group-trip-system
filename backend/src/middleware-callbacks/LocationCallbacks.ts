import LocationService from "../services/LocationService";
import { NextFunction, Request, Response } from "express";

class LoactionCallbacks {

  constructor() {

  }

  public getLocations = async (request: Request<{}, {}, any>, response: Response, next: NextFunction) => {
    return  LocationService.getLocations().then((locations) => {
        return response.json(locations);
    }).catch((error) => {
      next(error);
    })
  }
}

export default new LoactionCallbacks();