export const menuReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_MENU':
            return true;
        case 'HIDE_MENU':
            return false;
        default: 
            return state;
    }
}

export const cartReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_CART':
            return true;
        case 'HIDE_CART':
            return false;
        default: 
            return state;
    }
}