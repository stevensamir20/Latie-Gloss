import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FavoritesData } from './FavoritesData'

export const Favorites = () => {
  return (
    <div className="container">
    <div className="products-container">
      {FavoritesData.map(({id, title, color, img1, type, price}) => {
        return ( 
        <div className="product" key={id}>
        <div className="product-info">
            <img  className="product-info-img" src={img1} alt="" />
            <Link to={`/products/${id}`} className="product-info-name">{title}</Link>
            <p className='product-info-type'>
              {type}
              <FontAwesomeIcon 
              icon={faCircle} 
              style={{color: `${color}`}}
              size="sm" 
              className="product-info-color" 
              />
            </p>
            { price !== 0 ? 
            (<p className="product-info-price">LE {price}</p>) : 
            (<p className="product-info-price">OUT OF STOCK</p>)
            }
        </div>
       </div>
       )
      })}
    </div>
    </div>
  )
}
