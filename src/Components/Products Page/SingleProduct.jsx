import { React, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartContext from "../../Store/cart-context";
import { ProductsData } from "../../Database/ProductsData";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

export const ProductPage = () => {

  const { productId } = useParams();
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const [ product, setProduct ] = useState();
  const [ prodAmount, setProdAmount ] = useState(1);
  const inStock = product?.price > 0;

  useEffect(() => {
    setProduct(ProductsData.find((item) => { return item.id === +productId }))
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
  
  const buyItNow = (item) => {
    addToCart(item);
    navigate('/checkout')
  }

  // If there is no product
  if (!product) {
    return (
      <div className="alert alert-danger error">
        <h3>Product not found</h3>
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
          {inStock ? 
            ( <span><b>{prodAmount}</b></span>) : 
            ( <span><b>0</b></span>)
          }
          <FontAwesomeIcon 
          icon={faSquarePlus} 
          className="prod-control-amount-icon"
          onClick={incrementAmount}/>
        </div>
        <button 
        onClick={() => {addToCart(product)}} 
        className={`"prod-control-button" ${inStock ? 'prod-btn ': "prod-btn prod-btn-disabled" }`}
        disabled={!inStock}
        >
          <span>ADD TO CART</span>
        </button>
      </div>
      <button 
      className={inStock ? "prod-buy prod-btn": "prod-buy prod-btn prod-btn-disabled" } 
      onClick={() => {buyItNow(product)}}
      disabled={!inStock}>
        <span>BUY IT NOW</span>
      </button>
    </div>
    </div>
  </div>
  );
};
