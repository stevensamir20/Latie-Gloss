import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import CartContext from '../../Store/cart-context'
import emailjs from '@emailjs/browser';
import { FeesData } from '../../Database/FeesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

export const Checkout = () => {

  const cartContext = useContext(CartContext)
  const formRef = useRef()
  const navigate = useNavigate()
  const [ area, setArea ] = useState({price: 0})
  const [ mobileValid, setMobileValid ] = useState(true);
  const [ formValid, setFormValid ] = useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0)
  const [ pickup, setPickup ] = useState(false)
  const [ orderData, setOrderData ] = useState([])
  const [ deliveryMethod, setDeliveryMethod ] = useState()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  
  const totalAmount = cartContext.totalAmount
  const cartEmpty = cartContext.items.length === 0;
  const govs = FeesData.reduce((current, item) => {return current.concat(item.govs)}, []).sort()
 
  useEffect(() => {
    if(mobileValid && !cartEmpty){ setFormValid(true) }
    else { setFormValid(false) }
  }, [mobileValid, cartEmpty])

  useEffect(() => {
    setTotalPrice(totalAmount + area.price)
  }, [totalAmount, area.price])

  useEffect(() => {
    const itemsParsed = cartContext.items.reduce(
      (current, item) => {return current.concat(`x${item.amount} ${item.title} ${item.type}`)}, []
    ).join(' - ')
    setOrderData(itemsParsed)
  }, [cartContext.items])
  
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
      const fee = FeesData.find((item) => { return item.govs.includes(gov) })
      setArea(fee)
      if (gov === 'Ismailia') { setPickup(true) }
      else { setPickup(false) }
    }
    else {
      setArea({price: 0})
    }
  }

  const handleDeliveryMethod = (n) => {
    if(n === 1) {
      setDeliveryMethod('Pickup')
      setArea({...area, price:0})
    }
    else if (n === 2) {
      setDeliveryMethod('Cash on Delivery')
      if (area.area === 'Ismailia') {
        setArea({...area, price:15})
      }
    }
    else if (n === 3) {
      setDeliveryMethod('Vodafone Cash')
      if (area.area === 'Ismailia') {
        setArea({...area, price:15})
      }
    }
  }

  const handleFormSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    if (formValid) {
      emailjs.sendForm('service_xnxfxwp', 'template_m1w0tre', formRef.current, 'fx_-D2rXrTJVv-Lei')
      .then((result) => {
        cartContext.clearCart()
        setLoading(false)
        navigate('/success')
      }, (error) => {
        setLoading(false)
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3000);
      });
    }
    else {return}
  }

  // Functions to handle the amount of a single item / delete item
  const incrementItemAmount = (product) => { cartContext.addItem({...product, amount:1}) }
  const decrementItemAmount = (productId) => { cartContext.removeItem(productId) }

  return (
    <div className='container'>
      <div  className="checkout-grid">
      <form 
       onSubmit={(event) => {handleFormSubmit(event)}}
       ref={formRef}
      >
        <div className="checkout-user">
          <h1 className='mobile-top-border'><b>Billing Details</b></h1>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName" className='required'>First Name</label>
              <input 
               type="text" className="form-control" id="firstName" 
               placeholder="Enter your first name" required name="firstName"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName" className='required'>Last Name</label>
              <input
               type="text" className="form-control" id="lastName"
               placeholder="Enter your last name" required name="lastName"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="mobile" className='required'>Phone Number</label>
              <input
               required maxLength={11} name="mobile"
               onChange={(event) => {onMobileChange(event.target.value, 'change')}}
               onBlur={(event) => {onMobileChange(event.target.value, 'blur')}}
               type="text" className={`form-control ${mobileValid ? "" : "is-invalid"}`}
               id="mobile" placeholder="Enter your mobile number"
              />
              {!mobileValid && 
              <div className="invalid-feedback">
                Please enter a correct phone number.
              </div>}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email" className='required'>Email Address</label>
              <input 
               type="email" className="form-control" id="email"
               placeholder="Enter your email" required name="email"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="country">Country</label>
              <input type="text" className="form-control" id="country" value={"Egypt"} readOnly/>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="governorate" className='required'>Governorate</label>
              <select 
               onChange={(event) => {onAreaChange(event.target.value)}}
               id="governorate" className="form-control" required name="gov"
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
               type="text" className="form-control" id="postalCode" defaultValue=""
               placeholder="e.g. 11511" maxLength={5} name="postalCode"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address" className='required'>Street Address</label>
            <input 
             type="text" className="form-control" id="address"
             placeholder="Enter your street name and house number" required name="address"
            />
            <input 
             type="text" className="form-control second-address" id="addressTwo" defaultValue=""
             placeholder="Appartment number or any landmark (optional)" name="addressTwo"
            />
          </div>
          <h1 className='shipping-details-h1'><b>Shipping Details</b></h1>
          <div className="form-group">
            <label htmlFor="address" className='required'>
              <b>Delivery Options</b>
            </label>
            {pickup &&           
            <div className="form-check">
              <input 
               value={deliveryMethod} onClick={() => {handleDeliveryMethod(1)}}
               className="form-check-input" type="radio" 
               name="payMethod" id="payMethod1" 
              />
              <label className="form-check-label" htmlFor="payMethod1">Pickup</label>
              <span>Pick up from the store in Ismailia, our online sales team will contact your registered mobile number for order confirmation.</span>
            </div>}
            <div className="form-check">
              <input 
               value={deliveryMethod} onClick={() => {handleDeliveryMethod(2)}} required
               className="form-check-input" type="radio" name="payMethod" id="payMethod2"
              />
              <label className="form-check-label" htmlFor="payMethod2">Cash on Delivery</label>
              <span>Pay with cash on delivery, shipping cost depends on your shipping address and our online sales team will contact your registered mobile number for order confirmation.</span>
            </div>
            <div className="form-check">
              <input 
               value={deliveryMethod} onClick={() => {handleDeliveryMethod(3)}}
               className="form-check-input" type="radio" name="payMethod" id="payMethod3"
              />
              <label className="form-check-label" htmlFor="payMethod3">Vodafone Cash</label>
              <span>Pay with Vodafone Cash to &#40;<b>01000000</b>&#41;, our online sales team will contact your registered mobile number for order confirmation.</span>
            </div>
            <label htmlFor="instructions" className='instructions'>
              <b>Delivery Instructions</b>
            </label>
            <textarea 
             type="text" className="form-control" id="instructions" name="instructions"
             placeholder="Notes about your order, e.g. special notes for delivery." defaultValue=""
            />
          </div>
          <div className="checkout-pay">
            {loading ? (            
              <button 
               type="submit"  disabled
               className='d-flex align-items-center justify-content-evenly checkout-pay-button checkout-pay-button-disabled'
              >
                <div className="spinner-grow" role="status"></div>
                Placing Order
              </button>) : (
              <button 
                type="submit"  disabled={cartEmpty}
                className={`checkout-pay-button ${cartEmpty ? 'checkout-pay-button-disabled' : ''}`} 
              >
                Place Order
              </button>
            )}
          </div>
          {error &&     
          <div className="alert alert-danger" role="alert">
            An error has occured please try again later!
          </div>}
        </div>
        <input id="totalPrice" type="text" name="totalPrice" value={totalPrice} 
        readOnly style={{display: 'none'}}/>
        <input id="orderData" type="text" name="orderData" value={orderData} 
        readOnly style={{display: 'none'}}/>
      </form>
      <div className="checkout-cart">
        { cartEmpty && 
          <div className="checkout-cart-empty">
            <h2 className="checkout-cart-empty-text">
              <b>
              Your shopping cart is empty. 
              <br />
              Shop now to add products to your cart!
              </b>
            </h2> 
            <Link 
             to="/products" 
             className='checkout-cart-empty-link'>
              <button>SHOP NOW</button>
            </Link>
          </div>
        }
        { !cartEmpty &&  <h1><b>Your Order</b></h1> }
        <div>
          <ul className='checkout-cart-items'>
          {cartContext.items.map((item) => {
            return (
              <li className="checkout-cart-item" key={item.id}>
                <div className="checkout-cart-item-img">
                  <img src={item.image} alt="Product" />
                </div>
                <div className="checkout-cart-item-text">
                  <h5>
                    <b>
                      <Link to={`/products/${item.id}`}>
                        {item.title}
                      </Link>
                    </b>
                  </h5>
                  <h6><i>{item.type}</i></h6>
                </div>
                <div className="checkout-cart-item-control">
                  <div className="checkout-cart-item-control-amount">
                    <FontAwesomeIcon 
                     icon={faSquareMinus}
                     onClick={()=>{decrementItemAmount(item.id)}} 
                     size="xl" 
                     className="checkout-cart-icon"
                    />
                    <span><b>{item.amount}</b></span>
                    <FontAwesomeIcon 
                     icon={faSquarePlus} 
                     onClick={() => {incrementItemAmount(item)}}
                     size="xl" 
                     className="checkout-cart-icon"
                    />
                  </div>
                  <div className="checkout-cart-item-control-quantity">
                    <h5>LE <b>{item.amount * item.price}</b></h5>
                  </div>
                </div>
              </li>
            )
          })
          }
          </ul>
        </div>
        {!cartEmpty &&
          <div className='checkout-price'>
          <hr />
          <div className='checkout-price-sub checkout-price-flex'>
            <h3>Subtotal</h3> 
            <h3>LE {cartContext.totalAmount}</h3>
          </div>
          <div className='checkout-price-sub checkout-price-flex'>
            <h3>Shipping</h3> 
            <h3>LE {area.price}</h3>
          </div>
          <hr />
          <div className='checkout-price-total checkout-price-flex'>
            <h3><b>Total</b></h3> 
            <h3><b>LE {totalPrice}</b></h3>
          </div>
        </div>
        }
      </div>
      </div>
  </div>
  )
}
