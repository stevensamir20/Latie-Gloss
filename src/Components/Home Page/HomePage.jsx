import React from 'react'
import { Link } from 'react-router-dom';
import MyImage1 from './Pictures/img1.jpg';
import MyImage2 from './Pictures/img2.jpg';
import MyImage3 from './Pictures/img3.jpg';

export const HomePage = () => {
  return (
    <>
     <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{marginTop: '75px'}}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={MyImage1} className="d-block w-100 carousel-img" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/products"><button type="button" className="btn btn-outline-light"><span className="carousel-button-text" >SHOP NOW</span></button></Link>
            </div>
          </div>
          <div className="carousel-item">
            <img src={MyImage2} className="d-block w-100 carousel-img" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/products"><button type="button" className="btn btn-outline-light"><span className="carousel-button-text" >SHOP NOW</span></button></Link>
            </div>
          </div>
          <div className="carousel-item">
            <img src={MyImage3} className="d-block w-100 carousel-img" alt="..." />
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
    </>
  )
}
