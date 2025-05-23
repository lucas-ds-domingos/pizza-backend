import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma/index"
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email,password}: UserRequest){
        
        // verifica se enviou um email
        if(!email){
            throw new Error("Email incorreto")
        }

        //verifica se email ja esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("Esse email ja existe")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user
    }
}

export {CreateUserService}