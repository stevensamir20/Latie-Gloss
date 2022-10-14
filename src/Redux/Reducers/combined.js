import { menuReducer, cartReducer } from './sidebars';
import { combineReducers } from 'redux';

const allReducers = combineReducers ({
    menu: menuReducer, 
    cart: cartReducer
})

export default allReducers;