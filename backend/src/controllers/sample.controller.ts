import { Request, Response } from "express";

class SampleController {
  hello(req: Request, res: Response) {
    res.send('hello world');
  }
}

const sampleController = new SampleController();

export default sampleController;
