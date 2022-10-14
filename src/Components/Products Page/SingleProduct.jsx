import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader/Loader";

export const ProductPage = () => {

  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get("http://localhost:3000/getProducts/" + productId)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {
        setError("Couldn't find this product, try again later!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  function addToCart(product){
    let cart = [];
    cart.push(product)
    console.log(cart);
    cart.add(JSON.parse(localStorage.getItem('cart')));
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart);
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
      <h1 className="prod-title"><span style={{color: `${product.color}`}}>{product.title}</span> {product.type}</h1>
      { product.price !== 0 ? 
        (<h3 className="prod-price">Price: {product.price} EGP</h3>) : 
        (<h3 className="prod-price-out">OUT OF STOCK</h3>)
      }
      <div className="prod-desc">{product.description}</div>
    </div>
    </div>
  </div>
  );
};
