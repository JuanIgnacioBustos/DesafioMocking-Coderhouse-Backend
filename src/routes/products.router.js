import { Router } from "express"
import productsController from "../controllers/products.controller.js"
import passport from "passport"
import { adminRoleAuth } from "./middlewares/roles.middlewares.js"

const router = Router()

router.get('/', productsController.getProducts)

router.get('/:pid', productsController.getProductById)

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    adminRoleAuth,
    productsController.addProduct
) // Solo un admin puede agregar productos

router.put(
    '/:pid',
    passport.authenticate('jwt', {session: false}),
    adminRoleAuth,
    productsController.updateProduct
)

router.delete(
    '/:pid',
    passport.authenticate('jwt', {session: false}),
    adminRoleAuth,
    productsController.deleteProduct
)

export default router