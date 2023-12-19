import {Request, Response} from 'express'
import {CreateCategoryService} from '../../services/category/CreateCategoryService'
class CreateCategoryController{
  async handle(req:Request, res:Response){
    // pego o nome da requisicao que vem no body
    const {name} = req.body

    const createCategoryService = new CreateCategoryService(); //inicializar o servico
    // pegar o retorno / chamar o method para ser executado
    const category = await createCategoryService.execute({
      name
    });

    return res.json(category);
  }
}

export {CreateCategoryController}