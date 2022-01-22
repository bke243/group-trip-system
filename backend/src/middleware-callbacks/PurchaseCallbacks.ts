import { Request, Response } from "express";
import PurchaseService from "../services/PurchaseService";

class PurchaseCallbacks {

    constructor(
    ) {
  
    }
  
    public async createPurchase (request: Request, response: Response) : Promise<Response> {
        return await PurchaseService.createPurchase(request)
            .then(data => {
                return response.json(data).status(200)
            })
            .catch(err => {
                return response.json(err).status(400)
            })
    } 
  
}
  
export default new PurchaseCallbacks();