import prismaClient from "../../prisma";

class ListCategorySerice{
  async excute(){
    const category = await prismaClient.category.findMany({
      select:{
        id: true,
        name: true,
      }
    })

    return category
  }

}

export {ListCategorySerice}