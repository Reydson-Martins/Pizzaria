import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

interface UserRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  async execute({name, email, password}:UserRequest) {
    if(!email) {
      throw new Error("Email incorreto")
    }
    
    // verify email exists
    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })
    if (emailAlreadyExists) {
      throw new Error("Email ja existe")
    }

    const passwordHash = await hash(password, 8)

    const userCreate = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,

      },select: {
        id: true,
        name:true,
        email: true,
          },
      
    })

    return userCreate;

  }
}

export {CreateUserService}