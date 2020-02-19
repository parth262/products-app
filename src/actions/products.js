import { INSERT_PRODUCTS, UPDATE_PRODUCT } from "./constants";

export function insertProducts(products) {
    return {
        type: INSERT_PRODUCTS,
        products
    }
}

export function updateProduct(product) {
    return {
        type: UPDATE_PRODUCT,
        product
    }
}