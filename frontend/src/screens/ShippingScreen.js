import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  FormGroup,
  FormLabel,
  FormControl,

} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from '../actions/cartActions'


function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

  return (
    <Container>
        {/* <CheckoutSteps/> */}
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>

        <FormGroup controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Enter City"
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="postalCode">
          <FormLabel>Postal code</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Enter Country"
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>

        <Button 
        type="submit"
        variant="primary"
        >
            Continue
        </Button>

        </Form>
    </Container>
  )
}

export default ShippingScreen