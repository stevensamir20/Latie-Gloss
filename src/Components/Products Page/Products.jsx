import { React, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Loader } from '../Loader/Loader';

export const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get("http://localhost:3000/getProducts")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Couldn't get products data, try again later!"))
      .finally(() => setLoading(false));
  }, []);

  // If promise is pending
  if (loading) {
    return (
      <div className="loader">
        <Loader /> <span>Please wait, loading products</span>
      </div>
    );
  }

  // If promise is rejected
  if (error) {
    return (
      <div className="alert alert-danger error">
        <h3>{error}</h3>
      </div>
    );
  }
  
  return (
    <div className="container">
    <div className="products-container">
      { !products.length ? (
        <div>
          <h3 className="text-muted text-center">No Products "Empty"</h3>
        </div>
      ) : ( products.map(({id, title, color, img1, type, price}) => {
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
      }))}
    </div>
    </div>
  )
}
