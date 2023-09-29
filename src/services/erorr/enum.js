// Son los distintos codigos de error

export const ErrorEnum = {
    ROUTING_ERROR: 1,
    INVALID_TYPES_ERROR: 2, // El tipo de dato no es correcto
    DATABASE_ERROR: 3,
    PARAM_ERROR: 4, // Los parametros no son correctos
    PRODUCT_ALREADY_EXISTS: 5, // Cuando el "code" de producto se repite
    PRODUCT_DOES_NOT_EXIST: 6 // Cuando el "id" del producto no existe
    };