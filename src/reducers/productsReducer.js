import { INSERT_PRODUCTS, UPDATE_PRODUCT } from "../actions/constants";

export function productsReducer(state=[], action) {
    switch(action.type) {
        case INSERT_PRODUCTS: return action.products.map((product, i) => ({id: i, ...product}))
        case UPDATE_PRODUCT: return [action.product, ...state.filter(p => p.id!==action.product.id)].sort((a, b) => a.id-b.id)
        default: return state
    }
}