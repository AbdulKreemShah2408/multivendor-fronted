import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from "../components/layout/Footer"
import Header from '../components/layout/Header'
import Payment from "../components/Payment/Payment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SbB2q0cy6ESVuVPlDWm3KDA7hWkALtctzsTyAgqOF2abIzTbPnOgiay4MCvu74NFAQvA7uIJuXvzskStQB5ZP8600lHzbP3TF",'AaOE5f-sydO-HLQxnTXCDV2Abs1YG7zsSoEEmrutz4EM1Fyj2gRJMzw5ELPfyaWzR7io7Cx6YuH9I1CO');

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />

       {/* YE SABSE IMPORTANT PART */}
       <Elements stripe={stripePromise}>
          <Payment />
       </Elements>

       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage
