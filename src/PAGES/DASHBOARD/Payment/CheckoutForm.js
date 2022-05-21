import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorMassage from '../../SHARED/ErrorMassage';
import Loading from '../../SHARED/Loading/Loading';
import SuccessMassage from '../../SHARED/SuccessMassage';

const CheckoutForm = ({ bookingInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();

    const { _id, price, patientName, patientMail } = bookingInfo;

    useEffect(() => {
        fetch('https://e-health-server.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })
    }, [price])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        console.log(card);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        });

        if (error) {
            //console.log(error);
            setCardError(error?.message)
        }
        else {
            setCardError('');
            setSuccess('');
            setProcessing(true);
        }
        //or 
        // setcardError(error?.message || '')

        //Confirm Card Payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: patientMail
                    },
                },
            },
        );
        console.log(paymentIntent);
        if (intentError) {
            setCardError(error?.message);
            setProcessing(false);
        }
        else {
            setCardError('')
            setTransactionId(paymentIntent.id)

            setSuccess('Your Payment has been confirmed!')
            toast('successfully Payment complete!')
            //Procedure of PAYMENT stored to database
            const payment = {
                appointmentId : _id,
                transactionId: paymentIntent.id
            }
            fetch(`https://e-health-server.herokuapp.com/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    toast.success('payment Sent to database')
                    navigate('/dashboard')
                    console.log('sent to database:', data);
                })
         

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button className='btn btn-success btn-sm mt-4 text-white' type="submit" disabled={!stripe || !clientSecret || success}>
                    Pay
                </button>
            </form>
            {
              processing && <Loading></Loading>

            }

            {
                cardError && <ErrorMassage>{cardError}</ErrorMassage>
            }

            {
                success && <SuccessMassage>{success}<p> Your transaction id:</p> <span className='underline text-white inline'>{transactionId}</span></SuccessMassage>
            }
        </>

    );
};

export default CheckoutForm;