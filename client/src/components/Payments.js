import React, { Component } from 'react';

import { loadStripe } from "@stripe/stripe-js";
import {connect } from 'react-redux';
import * as actions from '../actions';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

class Payments extends Component {
   render() {  
      const handleClick = async (event) => {
         const stripe = await stripePromise;
     
         const response = await fetch("/api/create-session", {
           method: "POST",
         });
     
         const session = await response.json();
     
         // When the customer clicks on the button, redirect them to Checkout.
         const result = await stripe.redirectToCheckout({
           sessionId: session.id,
         })
     
         if (result.error) {
            console.log(result.error.message);
           // If `redirectToCheckout` fails due to a browser or network
           // error, display the localized error message to your customer
           // using `result.error.message`.
         }

       };
      
      return (
            <button 
               className='btn btn-info layered text-uppercase p-2 text-monospace font-weight-light my-2 my-md-0'
               onClick={handleClick}
            >
               Add Credits
            </button>
      )
   }
}

export default connect(null, actions)(Payments);
// card number for test 4242 4242 4242 4242 date should be in the future