import React from 'react'

export const ContactUsPage = () => {
  return (
    <div className="container">
    <div id="contact-page">
        <h2>Contact Us</h2>
        <div className="contact-policy">
            <span className='contact-policy-title'>Having any questions?</span>
            <p className='contact-policy-text'> 
             You can contact us on any of the following accounts by sending a message
             and we will reply as soon as possible.
            </p>
            <span className='contact-policy-title'>
              Instagram: 
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> 
                @latie
              </a>
            </span>
            <span className='contact-policy-title'>
              Facebook: 
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> 
                groupname
              </a>
            </span>
            <span className='contact-policy-title'>
              Mobile: 
              <a href="tel:+20-123-456-786">012345</a>
            </span>
        </div>
    </div>
    </div>
  )
}
