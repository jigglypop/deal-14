import { Request, Response } from "express";
import User from "../models/user";

class SampleController {
  async hello(req: Request, res: Response) {
    const users = await User.findAll()

    res.send(users);
  }
}

const sampleController = new SampleController();

export default sampleController;
