import React, { useState, useEffect, useContext, useRef } from 'react'
// eslint-disable-next-line
import { Link } from "react-router-dom";
import axios from 'axios';
import CartContext from '../../Store/cart-context'

export const Checkout = () => {

  const cartContext = useContext(CartContext)

  const [ fees, setFees ] = useState([])
  const [ area, setArea ] = useState({price: 0})
  const [ mobileValid, setMobileValid ] = useState(true);
  const [ formValid, setFormValid ] = useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0)
  const [ pickup, setPickup ] = useState(0)
  
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const mobileRef = useRef()
  const emailRef = useRef()
  const govRef = useRef()
  const postalCodeRef = useRef()
  const addressRef = useRef()
  const addressTwoRef = useRef()

  const totalAmount = cartContext.totalAmount
  const cartEmpty = cartContext.items.length === 0;
  const govs = fees.reduce((current, item) => {return current.concat(item.govs)}, []).sort()
 
  useEffect(() => {
    console.log("effect for api call");
    axios
    .get("http://localhost:3000/getFees")
    .then((res) => setFees(res.data))
  }, [])

  useEffect(() => {
    console.log("effect for form validity");
    if(mobileValid && !cartEmpty){ setFormValid(true) }
    else { setFormValid(false) }
  }, [mobileValid, cartEmpty])

  useEffect(() => {
    console.log("effect for total price");
   setTotalPrice(totalAmount + area.price)
  }, [totalAmount, area.price])
  
  const onMobileChange = (mobile, state) => {
    const mobileValid = new RegExp('^01[0-2,5][0-9]{8}$');
    if(state === 'blur') {
      if(mobileValid.test(mobile)){ return setMobileValid(true) }
      else { return setMobileValid(false) }
    }
    if(state === 'change') {
      if(mobileValid.test(mobile)){ return setMobileValid(true) }
    }
  }

  const onAreaChange = (gov) => {
    if(gov !== ''){
      const fee = fees.find((item) => { return item.govs.includes(gov) })
      setArea(fee)
      if (gov === 'Ismailia') { console.log("imsailia"); setPickup(true) }
    }
    else {
      setArea({price: 0})
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (formValid) {
      const userDetails = {
        name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
        number: mobileRef.current.value,
        email: emailRef.current.value
      }
      const addressDetails = {
        area: `${area.area}, Egypt`,
        governorate: govRef.current.value,
        postalCode: postalCodeRef.current.value,
        address: `${addressRef.current.value}, ${addressTwoRef.current.value}`,  
      }
      const paymentDetails = {
        totalPrice: totalPrice,
        paymentMethod: 'Cash / Vodafone / Pickup'
      }
      const orderDetails = {
        userDetails: userDetails,
        addressDetails: addressDetails,
        paymentDetails: paymentDetails,
        itemsDetails: cartContext.items
      }
      console.log(orderDetails);
    }
    else {return}
  }

  return (
    <div className='container'>
      <form 
       className="checkout-grid" 
       onSubmit={(event) => {handleFormSubmit(event)}}
      >
        <div className="checkout-user">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input 
               ref={firstNameRef}
               type="text" 
               className="form-control" 
               id="firstName" 
               placeholder="Enter your first name" 
               required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input 
               ref={lastNameRef}
               type="text" 
               className="form-control" 
               id="lastName" 
               placeholder="Enter your last name" 
               required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="mobile">Phone Number</label>
              <input
               ref={mobileRef}
               onChange={(event) => {onMobileChange(event.target.value, 'change')}}
               onBlur={(event) => {onMobileChange(event.target.value, 'blur')}}
               type="text"
               className={`form-control ${mobileValid ? "" : "is-invalid"}`}
               id="mobile" 
               placeholder="Enter your mobile number" 
               required
               maxLength={11}
              />
              {!mobileValid && 
              <div className="invalid-feedback">
                Please enter a correct phone number.
              </div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email Address</label>
              <input 
               ref={emailRef}
               type="email" 
               className="form-control" 
               id="email" 
               placeholder="Enter your email" 
               required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="country">Country</label>
              <input 
               type="text" 
               className="form-control" 
               id="country" 
               value={"Egypt"}
               readOnly
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="governorate">Governorate</label>
              <select 
               ref={govRef}
               onChange={(event) => {onAreaChange(event.target.value)}}
               id="governorate" 
               className="form-control"
               required
              >
                <option value=''>Select an option...</option>
                { govs.map((item) => {
                  return (
                    <option key={item} value={item}>{item}</option>
                )})}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="postalCode">Postal Code</label>
              <input 
               ref={postalCodeRef}
               type="text" 
               className="form-control" 
               id="postalCode" 
               placeholder="ex; 11511" 
               maxLength={5}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input 
             ref={addressRef}
             type="text" 
             className="form-control" 
             id="address" 
             placeholder="Enter your street name and house number" 
             required
            />
            <input 
             ref={addressTwoRef}
             type="text" 
             className="form-control" 
             id="address" 
             placeholder="Appartment number or any landmark (optional)" 
            />
          </div>
          <hr />
          <button 
           type="submit" 
           className="btn btn-primary"
          >
            Place Order
          </button>
        </div>
        </form>
        <div className="checkout-cart">
        <button onClick={() => {console.log(totalPrice)}}>click me plz</button>
        </div>
        
    </div>
  )
}
