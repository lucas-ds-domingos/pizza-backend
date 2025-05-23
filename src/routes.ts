import { Router, Request, Response } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserControlle } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersControler } from "./controllers/order/ListOrdersControler";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer"

const router = Router ();

const upload = multer(uploadConfig.upload("./tmp"))

// -- rotas user

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserControlle().handle)

router.get('/me',  isAuthenticated, new DetailUserController().handle)

// -- rotas category

router.post('/category',isAuthenticated, new CreateCategoryController().handle)

router.get('/category',isAuthenticated ,new ListCategoryController().handle)

// -- Rotas product

//router.post('/product', isAuthenticated, upload.single('file') , new CreateProductController().handle)
router.post('/product', isAuthenticated, new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)


// -- Rotas order

router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/item', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersControler().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export { router };
