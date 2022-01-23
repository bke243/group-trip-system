import { Request, Response } from "express";
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
                return response.status(400).json({error: err})
            })
    } 
  
}
  
export default new FeedbackCallbacks();