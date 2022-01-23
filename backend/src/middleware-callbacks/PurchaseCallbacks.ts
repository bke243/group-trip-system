import { Request, Response } from "express";
import PurchaseService from "../services/PurchaseService";

class PurchaseCallbacks {

    constructor(
    ) {
  
    }
  
    public async createPurchase (request: Request, response: Response) : Promise<Response> {
        return await PurchaseService.createPurchase(request)
            .then(data => {
                return response.status(200).json({success: 'purchase created successfully'})
            })
            .catch(err => {
                return response.status(400).json({error: err})
            })
    } 
  
}
  
export default new PurchaseCallbacks();