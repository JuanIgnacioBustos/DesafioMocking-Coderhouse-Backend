// Las funciones son utilizadas para generar el "cause" de un error

export const generateProductErrorInfo = (product) => {
    return `The code ${product.code} is duplicated`
    } // Utilizada para el codigo de error "PRODUCT_ALREADY_EXISTS"