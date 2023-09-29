import { Router } from "express";
import __dirname from "../utils.js";
import cartsController from "../controllers/carts.controller.js";
import passport from "passport";
import { verifyCartAccess } from "./middlewares/carts.middleware.js";
import { userRoleAuth } from "./middlewares/roles.middlewares.js";

const router = Router();

router.get('/', cartsController.getCarts)

router.get('/:cid', cartsController.getCartById)

router.post('/', cartsController.createCart)

router.post(
    '/:cid/product/:pid',
    passport.authenticate('jwt', {session: false}),
    userRoleAuth,
    verifyCartAccess,
    cartsController.addProductToCart
) // Solo los usuarios se pueden agregar productos al carrito, y solo a los de uno mismo

router.delete('/:cid/products/:pid', cartsController.deleteProductFromCart)

router.delete('/:cid', cartsController.deleteAllProductsFromCart)

router.put('/:cid', cartsController.replaceProductsFromCart)

router.put('/:cid/products/:pid', cartsController.updateProductQuantityFromCart)

router.post(
    '/:cid/purchase',
    passport.authenticate('jwt', {session: false}),
    userRoleAuth,
    verifyCartAccess,
    cartsController.purchaseProductsFromCart
) // Solo los usuarios pueden realizar la compra, y unicamente la de su carrito

export default router