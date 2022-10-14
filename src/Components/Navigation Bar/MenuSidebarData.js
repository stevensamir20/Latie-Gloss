import React from "react"
import { faHouse, faTruckFast, faPhone, faHeart, faCartPlus, faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const MenuSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FontAwesomeIcon icon={faHouse} size="xl" className="navbar-menu-icon"/>,
    cName: 'navbar-menu-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FontAwesomeIcon icon={faCartPlus} size="xl" className="navbar-menu-icon"/>,
    cName: 'navbar-menu-text'
  },
  {
    title: 'Favorites',
    path: '/favorites',
    icon: <FontAwesomeIcon icon={faHeart} size="xl" className="navbar-menu-icon"/>,
    cName: 'navbar-menu-text d-md-none',
  },
  {
    title: 'Shipping',
    path: '/shipping',
    icon: <FontAwesomeIcon icon={faTruckFast} size="xl" className="navbar-menu-icon"/>,
    cName: 'navbar-menu-text'
  },
  {
    title: 'Contact Us',
    path: '/contact',
    icon: <FontAwesomeIcon icon={faPhone} size="xl" className="navbar-menu-icon"/>,
    cName: 'navbar-menu-text'
  },
  {
    title: 'About Us',
    path: '/about',
    icon: <FontAwesomeIcon icon={faCircleQuestion} size="xl" className="navbar-menu-icon"/>,
    cName: 'navbar-menu-text'
  }
]