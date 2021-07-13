import { Request, Response, NextFunction } from "express"
import initService from '../services/init.service';

const initialize = async (req: Request, res: Response, next: NextFunction) => {
    await initService.createAllTable()
    next()
}
export default initialize