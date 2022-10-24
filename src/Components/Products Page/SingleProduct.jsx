import { React, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import CartContext from "../../Store/cart-context";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

export const ProductPage = () => {

  const cartContext = useContext(CartContext);
  const { productId } = useParams();
  const [ product, setProduct ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState("");
  const [ prodAmount, setProdAmount ] = useState();
  const inStock = product?.price > 0;

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get("http://localhost:3000/getProducts/" + productId)
      .then((res) => {
        setProduct(res.data);
        if(res.data.price > 0) {
          setProdAmount(1);
        } else {setProdAmount(0)}
      })
      .catch(() => {
        setError("Couldn't find this product, try again later!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  const incrementAmount = () => {
    if (prodAmount === 0 || prodAmount > 14) {
      return prodAmount
    } 
    else { 
      setProdAmount(prodAmount + 1)
    }
  }

  const decrementAmount = () => {
    if (prodAmount === 0 || prodAmount === 1) {
      return prodAmount
    } 
    else { 
      setProdAmount(prodAmount - 1)
    }
  }

  const addToCart = (item) => {
    cartContext.addItem({
      id: item.id,
      title: item.title,
      type: item.type,
      price: item.price,
      image: item.img1,
      amount: prodAmount
    })
  }
  
  // If promise is on pending state
  if (loading) {
    return (
      <div className="loader">
        <Loader /> <span>Loading product...</span>
      </div>
    );
  }

  // If promise is rejected
  if (error) {
    return (
      <div className="alert alert-danger error">
        <h3>{error}</h3>
        <h3>Product with id: "{productId}" is not found</h3>
      </div>
    );
  }

  return (
    <div className="container" style={{marginTop: "125px"}}>
      <div className="single-product">
      <div className="img-container"> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
        <div className="carousel-inner">
          <div className="carousel-item active product-img">
            <img src={product.img1} className="d-block w-100 carousel-img " alt="Product" />
          </div>
          <div className="carousel-item product-img">
            <img src={product.img2} className="d-block w-100 carousel-img" alt="Product Swatch" />
          </div>
          <div className="carousel-item product-img">
            <img src={product.img3} className="d-block w-100 carousel-img" alt="Product Swatch" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true">&lt;</span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true">&gt;</span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
    <div className="prod-container">
      <h1 className="prod-title">{product.title}</h1>
      { inStock ? 
        (<h3 className="prod-price">Price: {product.price} EGP</h3>) : 
        (<h3 className="prod-price-out">OUT OF STOCK</h3>)
      }
      <hr />
      <div className="prod-desc">{product.description}</div>
      <div className="prod-color">Color:&nbsp;<span className="prod-color-show"  style={{backgroundColor: `${product.color}`}}></span></div>
      <div className="prod-type">Category:&nbsp;<i>{product.type}</i></div>
      <div className="prod-control">
        <div className="prod-control-amount">
          <FontAwesomeIcon 
          icon={faSquareMinus} 
          className="prod-control-amount-icon" 
          onClick={decrementAmount}/>
            <span><b>{prodAmount}</b></span>
          <FontAwesomeIcon 
          icon={faSquarePlus} 
          className="prod-control-amount-icon"
          onClick={incrementAmount}/>
        </div>
        <button 
        onClick={() => {addToCart(product)}} 
        className={inStock ? "prod-control-button prod-btn": "prod-control-button prod-btn prod-btn-disabled" } 
        disabled={!inStock}
        >
          <span>ADD TO CART</span>
        </button>
      </div>
      <button 
      className={inStock ? "prod-buy prod-btn": "prod-buy prod-btn prod-btn-disabled" } 
      disabled={!inStock}><span>BUY IT NOW</span></button>
    </div>
    </div>
  </div>
  );
};
