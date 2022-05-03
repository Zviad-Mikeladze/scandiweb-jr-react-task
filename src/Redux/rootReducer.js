const currentID = window.location.pathname.split('/')[2]
const preferredCurrency = localStorage.getItem('preferredCurrency')
const initialState = {
    category: "all",
    productID: currentID,
    currency: preferredCurrency || "USD",
    cart: JSON.parse(localStorage.getItem("cart")) || []
}

const rootReducer = (state = initialState, action) => {
    if(action.type === "CATEGORY_UPDATE"){
        return {
            ...state,
            category: action.category
        }
    }

    if(action.type === "CURRENCY_UPDATE"){
        return {
            ...state,
            currency: action.currency
        }
    }

    if(action.type === "PRODUCT_ID_UPDATE"){
        return {
            ...state,
            productID: action.productID
        }
    }

    if(action.type === "ADD_TO_CART"){        
        localStorage.setItem("cart", JSON.stringify([...state.cart, action.product]))

        return {
            ...state,
            cart: [...state.cart, action.product]
        }
    }

    if(action.type === "CLEAR_CART"){
        localStorage.removeItem("cart")
        return {
            ...state,
            cart: []
        }
    }

    if(action.type === "REMOVE_CART_ITEM"){
        const newCart = state.cart.filter(cartItem => cartItem.id !== action.id)
        localStorage.setItem("cart", JSON.stringify(newCart))

        return {
            ...state,
            cart: newCart
        }
    }

    if(action.type === "QUANTITY_INC"){        

        const newCart = state.cart.map(item=>{
            if(item.id===action.id){
                if(item.quantity < 10){
                    return{
                        ...item,
                        quantity: Number(item.quantity)+1
                    } 
                } else return item
                

            } else return item
        })
        
        localStorage.setItem("cart", JSON.stringify(newCart))

        return {
            ...state,
            cart: newCart
        }
    }

    if(action.type === "QUANTITY_DEC"){        

        const newCart = state.cart.map(item=>{
            if(item.id===action.id){
                if(item.quantity > 1){
                    return{
                        ...item,
                        quantity: Number(item.quantity)-1
                    } 
                } else return item
                

            } else return item
        })
        

        localStorage.setItem("cart", JSON.stringify(newCart))

        return {
            ...state,
            cart: newCart
        }
    }

    else return state


}

export default rootReducer