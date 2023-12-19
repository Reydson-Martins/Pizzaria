import {Router} from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import {DetailUserController} from './controllers/user/DetailUserController'

import { isAuthentication } from './middlewares/isAuthentication';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

import uploadConfig from './config/multer'
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';
const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/userInfo', isAuthentication, new DetailUserController().handle)

// routes category
router.post('/category', isAuthentication, new CreateCategoryController().handle)

router.get('/category', isAuthentication, new ListCategoryController().handle)

// routes Products
router.post('/product', isAuthentication, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthentication, new ListByCategoryController().handle)


// routes Order
router.post('/order', isAuthentication, new CreateOrderController().handle)
router.delete('/order', isAuthentication, new RemoveOrderController().handle)

router.post('/order/add', isAuthentication, new AddItemController().handle)
router.delete('/order/remove', isAuthentication, new RemoveItemController().handle)

router.put('/order/send', isAuthentication, new SendOrderController().handle)

router.get('/orders', isAuthentication, new ListOrdersController().handle)

router.get('/order/detail', isAuthentication, new  DetailOrderController().handle)

router.put('/order/compleat', isAuthentication, new  FinishOrderController().handle)

export {router};