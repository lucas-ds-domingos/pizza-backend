import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserControlle{
    async handle(req: Request, res: Response){
        const {email, password} = req.body;

        const authUserService = new AuthUserService();
         const auth = await authUserService.execute({
            email,
            password
         })

         res.json(auth)
    }
}


export {AuthUserControlle}