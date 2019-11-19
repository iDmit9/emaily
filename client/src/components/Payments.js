import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
   render() {      
      return (
         <StripeCheckout 
            name='Emaily'
            description='$5 for 5 email credits'
            amount={500}//cents
            token={token => this.props.handleToken(token)}//recieved from stripe
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
         >
            <button className='btn'>Add Credits</button>
         </StripeCheckout>
      )
   }
}

export default connect(null, actions)(Payments);
// card number for test 4242 4242 4242 4242 date should be in the future