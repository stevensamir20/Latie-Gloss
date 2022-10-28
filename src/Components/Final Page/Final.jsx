import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'

export const Final = () => {
  return (
    <div className='container'>
      <div className='final'>
        <div className="final-wrapper">
          <h1 className='final-wrapper-text'>
            <FontAwesomeIcon icon={faSquareCheck} className='final-wrapper-icon'/>
            <b>Thank you</b>
          </h1>
          <h2>Your order has been successfuly placed!</h2>
          <h3>We will contact you as soon as possible to confirm your order information..</h3>
        </div>
      </div>
    </div>
  )
}
