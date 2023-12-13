import prismaClient from '../../prisma'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService{
  async execute({email, password}: AuthRequest){
    console.log(email,password)
    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })
    if (!user){
      throw Error ("email/password incorreto")
    }

    // verify passwords 
    const passwordMatch = await compare(password,user.password)

    if (!passwordMatch){
      throw Error ("email/password incorreto")
    }


    // Se login true - gerar o token pro usuário.
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }

    )
    
  

    return{
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }
}

export { AuthUserService};