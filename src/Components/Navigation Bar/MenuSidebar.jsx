import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { useOutsideClick } from '../../Hooks/OutsideClick';
import { useSelector, useDispatch } from 'react-redux';
import { hideMenuSidebar } from '../../Redux/Actions/actions'
import { MenuSidebarData } from './MenuSidebarData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export const MenuSidebar = () => {

    const menuOpen = useSelector(state => state.menu)
    const dispatch = useDispatch();
    
    // Using a function and a custom hook to close the search sidebar upon clicking outside
    const handleClickOutsideMenu = () => {
        dispatch(hideMenuSidebar())
    };
    const menuRef = useOutsideClick(handleClickOutsideMenu);

  return (
    <>
    <div ref={menuRef} className={menuOpen ? 'navbar-menu-active' : 'navbar-menu-closed'}>
      <div className='navbar-menu-header'>
        <span className="menu-header-text">MENU</span>
        <FontAwesomeIcon 
            icon={faCircleXmark} className='mobile-close-icon'
            onClick={() => dispatch(hideMenuSidebar())}
          />
      </div>
      <ul className='navbar-menu-items'>
      {MenuSidebarData.map((item, id) => {
        return (
          <li key={id} className={item.cName}>
            <NavLink 
            end 
            to={item.path} 
            className="navbar-menu-links" 
            onClick={() => dispatch(hideMenuSidebar())}
            >
              {item.icon}
              <span className="navbar-menu-text-title">{item.title}</span>
            </NavLink>
          </li>
        )
      })
      }
      </ul>
      <div className="sidebar-close">
          <Link onClick={() => dispatch(hideMenuSidebar())} to="#">
            <span className="sidebar-close-text">CLOSE</span>
          </Link>
      </div>
      </div>
    </>
  )
}
