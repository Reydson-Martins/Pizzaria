import { Request, Response } from "express";
import { ListCategorySerice } from "../../services/category/ListCategoryService";

class ListCategoryController{
  async handle(req:Request, res:Response){
const listCategorySerice = new ListCategorySerice();

const category = await listCategorySerice.excute();

return res.json(category)

  }

}

export {ListCategoryController}