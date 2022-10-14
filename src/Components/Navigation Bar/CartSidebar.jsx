import React from 'react'
import { Link } from "react-router-dom";
import { useOutsideClick } from '../../Hooks/OutsideClick';
import { useSelector, useDispatch } from 'react-redux';
import { showCartSidebar, hideCartSidebar } from '../../Redux/Actions/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

export const CartSidebar = () => {

  const cartOpen = useSelector(state => state.cart)
  const dispatch = useDispatch();
  
  // Using a function and a custom hook to close the search sidebar upon clicking outside
  const handleClickOutsideCart = () => {
      dispatch(hideCartSidebar())
  };
  const cartRef = useOutsideClick(handleClickOutsideCart);


  //testing static
  var CartSidebarData = [
    {
      id: 1,
      title: "Sunela",
      type: "Lip Gloss",
      description: "loremshit",
      price: 35,
      color: "#121212",
      img1: "https://i.im.ge/2022/09/19/1sUk29.1.png",
      img2: "https://i.im.ge/2022/09/19/1shT2p.2.png",
      img3: "https://i.im.ge/2022/09/19/1shrlf.3.png"
    }
  ];

  return (
    <>
      <div ref={cartRef} className={cartOpen ? 'navbar-cart-active' : 'navbar-cart-closed'}>
        <div className='navbar-cart-header'>
          <span className="cart-header-text">Shopping Cart</span>
        </div>
        <ul className='navbar-cart-items'>
        {CartSidebarData.map((item) => {
          return (
          <div key={item.id}>
            <li className="cart-item">
              <div className="cart-item-img">
                <img src={item.img1} alt="Product" />
              </div>
              <div className="cart-item-text">
                <h3><b>{item.title}</b></h3>
                <h5><i>{item.type}</i></h5>
                <h5>Price: LE <b>{item.price}</b></h5>
              </div>
              <div className="cart-item-control">
                <div className="cart-item-control-amount">
                  <FontAwesomeIcon icon={faSquareMinus} size="2xl" className="navbar-cart-icon"/>
                  <span><b>3</b></span>
                  <FontAwesomeIcon icon={faSquarePlus} size="2xl" className="navbar-cart-icon"/>
                </div>
                <div className="cart-item-control-quantity">
                  <h5>Total: LE <b>120</b></h5>
                </div>
                <div className="cart-item-control-delete">
                  <FontAwesomeIcon icon={faTrash} size="xl" className="navbar-cart-icon"/>
                </div>
              </div>
            </li>
          </div>
          )
        })
        }
        </ul>
        <div className="sidebar-close">
          <Link onClick={() => dispatch(hideCartSidebar())} to="#" className='cart-order'>
            <span className="sidebar-close-text">ORDER</span>
          </Link>
          <Link onClick={() => dispatch(hideCartSidebar())} to="#">
            <span className="sidebar-close-text">CLOSE</span>
          </Link>
        </div>
      </div>
    </>
  )
}