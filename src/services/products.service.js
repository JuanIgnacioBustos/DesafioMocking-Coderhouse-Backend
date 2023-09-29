import ProductManager from "../daos/mongodb/managers/ProductMongo.dao.js"

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
        await this.productDao.addProduct(newProduct)
    }
    
    async updateProduct(productId, newProduct) {
        await this.productDao.updateProduct(productId, newProduct)
    }
    
    async deleteProduct(productId) {
        await this.productDao.deleteProduct(productId)
    }
}