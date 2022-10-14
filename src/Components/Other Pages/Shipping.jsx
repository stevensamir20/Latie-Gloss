import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Loader } from "../Loader/Loader"

export const ShippingPage = () => {

  
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get("http://localhost:3000/getFees")
      .then((res) => setFees(res.data))
      .catch(() => setError("Couldn't get shipping prices, try again later!"))
      .finally(() => setLoading(false));
  }, []);

  // If promise is rejected
  if (error) {
    return (
      <div className="alert alert-danger error">
        <h3>{error}</h3>
      </div>
    );
  }
  
  return (
    <div className="container">
    <div id="shipping-page">
      <h2>Shipping Fees</h2>
      <div className="shipping-fees">
      { loading &&
        <div className="loader">
          <Loader /> <span>Loading shipping prices..</span>
        </div>
      }
      { fees.map((item) => {
          return(
          <div className="shipping-fees-card" key={item.id}>
            <span className="shipping-fees-title">{item.area}</span><hr />
            <span className="shipping-fees-price">LE {item.price}</span>
          </div>
          )
      })}
      </div>
      <hr />
      <h2>Shipping Policy</h2>
      <div className="shipping-policy">
        <span className='shipping-policy-title'>Shipment Time</span>
        <p className='shipping-policy-text'> 
          All orders are processed within 2-4 days. Orders are not shipped or delivered on holidays.<br />
          If we are experiencing a high volume of orders, shipments may be delayed by a few days. 
          Please allow additional days in transit for delivery. 
          If there will be a significant delay in shipment of your order, 
          we will contact you via email or telephone.
        </p>
        <span className='shipping-policy-title'>Shipment Confirmation</span>
        <p className='shipping-policy-text'> 
          You will receive a Shipment Confirmation via email or 
          telephone once your order has shipped containing your tracking number(s). 
          The tracking number will be active within 24 hours.
        </p>
        <span className='shipping-policy-title'>Shipment Damages</span>
        <p className='shipping-policy-text'> 
          If there is any damaged product in shipping it will be replaced or refunded.
        </p>
      </div>
    </div>
    </div>
  )
}
