import React, { useReducer, useEffect } from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (itemId) => {},
    deleteItem: (itemId) => {}
});

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartInitializer = (initialCartState = defaultCartState) =>
  JSON.parse(localStorage.getItem("localCart")) || initialCartState;

const cartReducer = (state, action) => {

    if (action.type === 'ADD_TO_CART') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingItemIndex];
        let updatedItems;

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };

            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } 
        else { updatedItems = state.items.concat(action.item); }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE_FROM_CART') {
        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        if ( existingItem.amount === 1 ) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } 
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'DELETE_FROM_CART') {

        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price * existingItem.amount;
        const updatedItems = state.items.filter(item => item.id !== action.id);

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return cartInitializer;
}

export const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState, cartInitializer)

    useEffect(() => {
        localStorage.setItem("localCart", JSON.stringify(cartState));
    }, [cartState]);
    

    const addItemToCart = (item) => {
        dispatchCartAction({
            type: 'ADD_TO_CART',
            item: item
        });
    };

    const removeItemFromCart = (itemId) => {
        dispatchCartAction({
            type: 'REMOVE_FROM_CART',
            id: itemId
        });
    };

    const deleteItemFromCart = (itemId) => {
        dispatchCartAction({
            type: 'DELETE_FROM_CART',
            id: itemId
        });
    };
    
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        deleteItem: deleteItemFromCart
    }

    return <CartContext.Provider value={cartContext}> {props.children} </CartContext.Provider>
};

export default CartContext;