import React from 'react'
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
     <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{marginTop: '75px'}}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://i.ibb.co/QddyxsY/img1.jpg" className="d-block w-100 carousel-img" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/products"><button type="button" className="btn btn-outline-light"><span className="carousel-button-text" >SHOP NOW</span></button></Link>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/V2p4DRJ/img2.jpg" className="d-block w-100 carousel-img" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/products"><button type="button" className="btn btn-outline-light"><span className="carousel-button-text" >SHOP NOW</span></button></Link>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/QddyxsY/img1.jpg" className="d-block w-100 carousel-img" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/products"><button type="button" className="btn btn-outline-light"><span className="carousel-button-text" >SHOP NOW</span></button></Link>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="home-categories-wrapper">
        <Link to="/products" className="home-categories-wrapper-link">
          <button type="button" className="btn btn-outline-light">
            Browse our all natural products
          </button>
        </Link>
       
        <div className='home-categories'>
          <Link to={{ pathname: "/products", search: 'gloss' }} className='home-categories-div'> 
            <div id="gloss-home-cateogry" className='home-categories-box'></div>
          </Link>
          <Link to={{ pathname: "/products", search: 'balm' }} className='home-categories-div'>
            <div id="balm-home-cateogry" className='home-categories-box'></div>
          </Link>
          <Link to={{ pathname: "/products", search: 'oil' }} className='home-categories-div'>
            <div id="oil-home-cateogry" className='home-categories-box'></div>
          </Link>
        </div>
      </div>
    </>
  )
}
