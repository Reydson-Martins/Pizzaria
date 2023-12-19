import prismaClient from "../../prisma"

interface CategoryRequest{
  name: string;
}

class CreateCategoryService {
  async execute({name}: CategoryRequest){

    // se enviar vazio nao ira cadastrar 
    if (name === ''){
      throw new Error('Name invalid')
    }
    // cadastrar nome no banco
    const category = await prismaClient.category.create({
      data:{
        name: name,
      },select: {
        id: true,
        name:true,
      }
    })
    return category
  }
}

export {CreateCategoryService}