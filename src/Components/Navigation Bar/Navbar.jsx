import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { showCartSidebar, showMenuSidebar } from '../../Redux/Actions/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHeart, faBars } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {

  const dispatch = useDispatch();
  const cartOpen = useSelector(state => state.cart)
  const menuOpen = useSelector(state => state.menu)
  const searchOpen = useSelector(state => state.search)
 
  // State and reference for the navbar background blur
  const [navBackground, setNavBackground] = useState('navbarSolid')
  const navRef = useRef()
  navRef.current = navBackground

  // Effect to fade out the navbar upon scrolling
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 60
      if (!show) {
        setNavBackground('navbarSolid')
      } else {
        setNavBackground('navbarTrans')
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Function to check if both sidebars are closed
  const isSidebarOpen = ()  =>{
    if ( menuOpen || cartOpen || searchOpen ) {
      return true
    }
    else { return false }
  }

  return (
    <>
    {/* ***********When any sidebar is open, make the background darker*********** */}
    {isSidebarOpen() && (<span id="backgroundBlur"></span>)}

    <nav id="navbar" className={navRef.current}>
      <div className="navbar-menu">
      <Link to="#" >
        <FontAwesomeIcon onClick={() => dispatch(showMenuSidebar())} icon={faBars} style={{marginLeft: '30px'}} size="2xl" className="nav-icon" />
      </Link>
      </div>
      <div id="navbar-brand">
        <Link to="/"><h1 id="navbar-brand-text">LATIE</h1></Link>
      </div>
      <div id="navbar-list">
        <ul id="navbar-list-styling">
          <li id="list-favorites" className="navbar-list-item d-none d-md-block">
            <NavLink to="/favorites"> 
              <FontAwesomeIcon icon={faHeart} size="xl" className="nav-icon" />
            </NavLink>
          </li>
          <li id="list-cart" className="navbar-list-item">  
            <Link to="#"> 
              <FontAwesomeIcon onClick={() => dispatch(showCartSidebar())} icon={faShoppingCart} size="xl" className="nav-icon" />
              <span className="cart-count">0</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}