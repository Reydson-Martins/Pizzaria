import prismaClient from "../../prisma";

interface ItemRemoveRequest {
item_id: string
}
class RemoveItemService {
  async execute ({item_id}:ItemRemoveRequest) {

  const item = await prismaClient.item.delete({
    where:{ 
    id: item_id 
      }
  });
  return item
  }
}

export {RemoveItemService}