import { Request, Response } from 'express';
import { RESPONSE_STATUS } from '../middlewares/request-body-validator';
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
                return response.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({error: err})
            })
    } 
  
}
  
export default new PurchaseCallbacks();