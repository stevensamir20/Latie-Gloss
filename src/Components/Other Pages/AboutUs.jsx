import React from 'react';
import { Link } from 'react-router-dom';

export const AboutUsPage = () => {
  return (
    <div className="container">
    <div id="about-page">
        <h2>About Us</h2>
        <div className='about-us' style={{marginBottom: "20px"}}>
            <p className='about-policy-text'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tenetur 
                sequi fugit animi fuga amet, esse delectus illo, 
                facilis sunt quo dicta ea expedita vitae molestias ducimus ut non. Omnis.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tenetur 
                sequi fugit animi fuga amet, esse delectus illo, 
                facilis sunt quo dicta ea expedita vitae molestias ducimus ut non. Omnis.
            </p>
        </div>
        <hr />
        <div className="about-policy">
            <h2>What makes us special?</h2>
            <span className='about-policy-title'>Premium Materials</span>
            <p className='about-policy-text'> 
             All of the lip-care products are made with natural oils and
             vitamins.
            </p>
            <span className='about-policy-title'>Fast Shipping</span>
            <p className='about-policy-text'> 
             We make sure you recieve your orders as fast as possible, ensuring
             there are no damages or faults.
            </p>
            <span className='about-policy-title'>Offers &amp; Gifts</span>
            <p className='about-policy-text'> 
             There will always be offers and surprise gifts upon ordering from our 
                <Link to="/">
                    Website
                </Link>
             or our
                <a href="https://instagram.com/latie_gloss?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer"> 
                    Instagram Page.
                </a>
            </p>
        </div>
    </div>
    </div>
  )
}
