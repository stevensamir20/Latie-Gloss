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
              <a href="https://instagram.com/latie_gloss?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer"> 
                @latie_gloss
              </a>
            </span>
            <span className='contact-policy-title'>
              Facebook Group: 
              <a href="https://www.facebook.com/groups/128609392442462/?ref=share" target="_blank" rel="noopener noreferrer"> 
                Latie for natural products
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
