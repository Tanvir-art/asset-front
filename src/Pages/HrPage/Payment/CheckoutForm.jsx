import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import UseHr from '../../../hooks/UseHr/UseHr';
import { AuthContext } from '../../../provider/AuthProvider';

const CheckoutForm = () => {
    // const {error, setError} = useState('')
    const [transictionId, setTransictionId] = useState('')
    const {user} = useContext(AuthContext);
    // console.log(user?.email)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();

    const axiosPublic = useAxiosPublic();
    const [hr] = UseHr();
    console.log(hr)
    const packages = hr[0]?.package;
    console.log(packages)


    useEffect(()=>{
      axiosPublic.post('/create-payment-intent', {packages: packages})
      .then(res=> {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
      })
    },[ axiosPublic,packages])



    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement)
        if(card===null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          if (error) {
            console.log('payment error', error);
            
          } else {
            console.log('PaymentMethod', paymentMethod);
           
          }

          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
              card: card,
              billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
              }
            }
          })

          if(confirmError){
            console.log('confirm error')
          }else{
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
              console.log('transiction id', paymentIntent.id)
              setTransictionId(paymentIntent.id)
            }
          }
    }
  return (
    <form onSubmit={handleSubmit} >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />

<div className='flex justify-center'>
<button className='btn btn-primary my-4' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
</div>

        {transictionId && <p className='text-green-600'>transiction is successfull , your transiction is {transictionId}</p>}
      
    </form>
  )
}

export default CheckoutForm
