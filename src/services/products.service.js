import ProductManager from "../daos/mongodb/managers/ProductMongo.dao.js"

import CustomError from "./error/CustomError.js"
import { generateProductErrorInfo } from "./error/info.js"
import { ErrorEnum } from "./error/enum.js"

export default class ProductService {

    constructor() {
        this.productDao = new ProductManager()
    }

    async getProducts(limit, page, sort, filter, filterValue) {
        let products = await this.productDao.getProducts(limit, page, sort, filter, filterValue)

        return products
    }
    
    async getProductById(productId) {
        let product = await this.productDao.getProductById(productId)
    
        return product
    }
    
    async addProduct(newProduct) {
        let products = await this.productDao.getProducts()

        console.log(products.docs)

        for (let prod of products.docs) {
        if (prod.code === newProduct.code) {
            CustomError.createError({
            name: "Product duplicated",
            cause: generateProductErrorInfo(newProduct),
            message: "Product couldn't be created",
            code: ErrorEnum.PRODUCT_ALREADY_EXISTS
            })
        }
        }

        await this.productDao.addProduct(newProduct)
    }
    
    async updateProduct(productId, newProduct) {
        await this.productDao.updateProduct(productId, newProduct)
    }
    
    async deleteProduct(productId) {
        await this.productDao.deleteProduct(productId)
    }
}