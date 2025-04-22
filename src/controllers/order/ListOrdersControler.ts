import { Request, Response } from "express";
import { ListOrdersServices } from "../../services/order/ListOrdersServices";

class ListOrdersControler{
    async handle(req: Request, res: Response){

        const listOrdersServices = new ListOrdersServices();

        const order = await listOrdersServices.execute();

        return res.json(order);
    }
}

export {ListOrdersControler}