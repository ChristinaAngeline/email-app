import React,  { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from "../actions";

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
            name="Email"
            description="$5 for 5 survey email credits"
            // you have to calculate the in cents
            // if you want $5 you would need 500 cents 
             amount={500}
             token={token => this.props.handleToken(token)}
             stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className='btn'>
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);