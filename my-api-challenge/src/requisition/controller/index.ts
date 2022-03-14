import { Request, Response } from "express";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { RequisitionInstance } from "../model";
import CompareObjects from "../validator/CompareObjects";

class RequisitionController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    const { userId } = req.body;

    try {
      let bodyReq = req.body; // copy body request
      delete bodyReq.userId; // remove userId of body request

      // get current date decreasing 10 minutes
      let dateLast = new Date();
      dateLast.setMinutes(dateLast.getMinutes() - 10);

      // query latest requests for that same user
      const requestsLastMin =
        (await RequisitionInstance.findAll({
          where: { userId, DateTime: { [Op.gt]: dateLast } },
        })) || [];

      // if have previous request, examine the body
      for (let value of requestsLastMin as any) {
        if ("bodyReq" in value) {
          // function to compare objects (no matter the order)
          // if returns true, they are equal
          if (CompareObjects.check(bodyReq, value["bodyReq"]))
            return res
              .status(403)
              .json({ status: "Request Error", msg: "Repeated request in a short time" });
        }
      }

      // if not, we create the request
      const record = await RequisitionInstance.create({
        id,
        userId,
        bodyReq,
        DateTime: new Date(),
      });

      return res.status(201).json({ record });
    } catch (e) {
      return res.status(500).json({ status: "Request Error", msg: "Unexpected internal error" });
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const records = await RequisitionInstance.findAll({ where: {} });
      return res.status(200).json(records);
    } catch (e) {
      return res.status(500).json({ status: "Request Error", msg: "Unexpected internal error" });
    }
  }

  async readByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const records = await RequisitionInstance.findAll({ where: { userId } });
      return res.status(200).json(records);
    } catch (e) {
      return res.status(500).json({ status: "Request Error", msg: "Unexpected internal error" });
    }
  }

  async readLastUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      // get date of last 10 min
      let dateLast = new Date();
      dateLast.setMinutes(dateLast.getMinutes() - 10);

      const records = await RequisitionInstance.findAll({
        where: { userId, DateTime: { [Op.gt]: dateLast } },
      });

      return res.status(200).json(records);
    } catch (e) {
      return res.status(500).json({ status: "Request Error", msg: "Unexpected internal error" });
    }
  }
}

export default new RequisitionController();
