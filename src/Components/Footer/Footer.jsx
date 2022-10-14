import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { FooterSocialData, FooterLinksData } from './FooterData';

export const Footer = () => {

  return (
    <>
    <footer>
    <div className="footer">
    <ul className="footer-social-list">
      {FooterSocialData.map((item, id) => {
      return(
      <li key={id}>
        <a href={item.path} target="_blank" rel="noopener noreferrer"> 
          {item.icon}
        </a>
      </li>
      )
      })}
    </ul>
    <ul className="footer-navigation-list">
      {FooterLinksData.map((item, id) => {
        return (
        <li key={id}>
          <NavLink to={item.path}>
            <span className={item.cName}>{item.title}</span>
          </NavLink>
        </li>
        )
      })}
    </ul>
    <div className="copyright">
      <span className="copyright-logo">
        &copy;
      </span>
      <span className="copyright-text">
        Copyright 2022,
      </span>
      <Link to="/" className="copyright-brand-text">
        LATIE
      </Link>
    </div>
    </div>
    </footer>
    </>
  )
}
