// Estas funciones son utilizadas para generar el "cause" de un error

export const generateProductCodeErrorInfo = (product) => {
    return `A product with the code ${product.code} already exists`
    } // Utilizada para el codigo de error "PRODUCT_ALREADY_EXISTS"
    
    export const generateProductIdErrorInfo = (productId) => {
        return `There is no product with id ${productId}`
    }