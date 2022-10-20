import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { useOutsideClick } from '../../Hooks/OutsideClick';
import { useSelector, useDispatch } from 'react-redux';
import { hideCartSidebar } from '../../Redux/Actions/actions'
import CartContext from '../../Store/cart-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

export const CartSidebar = () => {

  // Cart context to handle items and total price in the cart
  const cartContext = useContext(CartContext);
  const cartItemsNumber = 
  cartContext.items.reduce((currentNumber, item) => { return currentNumber + item.amount;}, 0);
  const totalAmount = cartContext.totalAmount
  const cartEmpty = cartContext.items.length > 0;

  // Using a function, redux and a custom hook to close the search sidebar upon clicking outside
  const cartOpen = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const handleClickOutsideCart = () => { dispatch(hideCartSidebar()) };
  const cartRef = useOutsideClick(handleClickOutsideCart);

  // Functions to handle the amount of a single item / delete item
  const incrementItemAmount = (product) => {
    cartContext.addItem({...product, amount:1})
  }
  const decrementItemAmount = (productId) => {
    cartContext.removeItem(productId)
  }
  const deleteItem = (productId) => {
    cartContext.deleteItem(productId)
  }

  return (
    <>
      <div ref={cartRef} className={cartOpen ? 'navbar-cart-active' : 'navbar-cart-closed'}>
        <div className='navbar-cart-header'>
          <span className="cart-header-text">Shopping Cart</span>
        </div>
        <ul className='navbar-cart-items'>
        { !cartEmpty && 
          <div className="cart-empty">
            <span className="cart-empty-text">Your cart is empty shop now to add more products!</span> 
            <Link to="/products" className='cart-empty-link'>shop now</Link>
          </div>
        }
        {cartContext.items.map((item) => {
          return (
          <div key={item.id}>
            <li className="cart-item">
              <div className="cart-item-img">
                <img src={item.image} alt="Product" />
              </div>
              <div className="cart-item-text">
                <h3>
                  <b>
                    <Link to={`/products/${item.id}`} onClick={() => dispatch(hideCartSidebar())}>
                      {item.title}
                    </Link>
                  </b>
                </h3>
                <h5><i>{item.type}</i></h5>
                <h5>Price: LE <b>{item.price}</b></h5>
              </div>
              <div className="cart-item-control">
                <div className="cart-item-control-amount">
                  <FontAwesomeIcon 
                   icon={faSquareMinus}
                   onClick={()=>{decrementItemAmount(item.id)}} 
                   size="2xl" 
                   className="navbar-cart-icon"
                  />
                  <span><b>{item.amount}</b></span>
                  <FontAwesomeIcon 
                   icon={faSquarePlus} 
                   onClick={() => {incrementItemAmount(item)}}
                   size="2xl" 
                   className="navbar-cart-icon"
                  />
                </div>
                <div className="cart-item-control-quantity">
                  <h5>Total: LE <b>{item.amount * item.price}</b></h5>
                </div>
                <div className="cart-item-control-delete">
                  <FontAwesomeIcon 
                   icon={faTrash} 
                   onClick={() => {deleteItem(item.id)}}
                   size="xl" 
                   className="navbar-cart-icon"
                  />
                </div>
              </div>
            </li>
          </div>
          )
        })
        }
        </ul>
        { cartEmpty && 
          <div className="cart-final">
            <div className="cart-final-amount"><h1>Items count: {cartItemsNumber}</h1></div>
            <div className="cart-final-price"><h1>Total price: {totalAmount}</h1></div>
          </div>
        }
        <div className="sidebar-close">
          { cartEmpty && 
            <Link onClick={() => dispatch(hideCartSidebar())} to="#" className='cart-order'>
              <span className="sidebar-close-text">ORDER</span>
            </Link>
          }
          <Link onClick={() => dispatch(hideCartSidebar())} to="#">
            <span className="sidebar-close-text">CLOSE</span>
          </Link>
        </div>
      </div>
    </>
  )
}