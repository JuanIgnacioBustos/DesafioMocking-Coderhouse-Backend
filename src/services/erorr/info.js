// Estas funciones son utilizadas para generar el "cause" de un error

export const generateProductErrorInfo = (product) => {
    return `A product with the code ${product.code} already exists`
    } // Utilizada para el codigo de error "PRODUCT_ALREADY_EXISTS"