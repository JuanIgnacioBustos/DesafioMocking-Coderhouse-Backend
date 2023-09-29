import { productsModel } from '../models/products.model.js'

export default class ProductManager {

    async addProduct(product) {
        let result = await productsModel.create(product)
        return result
    }

    async getProducts(limit = 10, page = 1, sort = 0, filter = null, filterValue = null) {
        limit = Number(limit)
        page = Number(page)
        sort = Number(sort)

        let options;

        let filterToApply = {}
        if (filter && filterValue) {
        filterToApply = {[filter]: filterValue} // [filter] es el contenido de la variable "filter"
        }

        if (!sort) {
        options = { limit: limit, page: page, lean: true }
        }
        else {
        options = { limit: limit, page: page, sort: { price: sort, _id: -1 }, lean: true }
        }

        let result = await productsModel.paginate(
        filterToApply,
        options
        // Se utiliza el "_id" en el sort para evitar un "bug" que tiene mongoose:
        // https://stackoverflow.com/questions/73300233/mongoose-pagination-with-sort-in-not-working-properly
        )

        return result
    }

    async getProductById(id) {
        let result = await productsModel.findOne({ _id: id })

        return result
    }

    async updateProduct(id, updatedProduct) {
        let result = await productsModel.updateOne({ _id: id}, { $set: updatedProduct })
        return result
    }

    async deleteProduct(id) {
        let result = await productsModel.deleteOne({ _id: id })
        return result
    }
    
}