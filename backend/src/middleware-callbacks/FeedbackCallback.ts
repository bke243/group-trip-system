import { Request, Response } from 'express';
import { RESPONSE_STATUS } from '../middlewares/request-body-validator';
import FeedbackService from "../services/FeedbackService";

class FeedbackCallbacks {

    constructor(
    ) {
  
    }
  
    public async createFeedback (request: Request, response: Response) : Promise<Response> {
        return await FeedbackService.createFeedback(request)
            .then(data => {
                return response.status(200).json({success: 'feedback created successfully'})
            })
            .catch(err => {
                return response.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({error: err})
            })
    } 
  
}
  
export default new FeedbackCallbacks();