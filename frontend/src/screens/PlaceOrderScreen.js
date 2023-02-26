import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const shippingPrice = (itemsPrice > 300 ? 0 : 10).toFixed(2);
  const taxPrice = Number(0.083 * itemsPrice).toFixed(2);
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

  const updatedCart = {
    ...cart,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  if (!updatedCart.paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: updatedCart.cartItems,
        shippingAddress: updatedCart.shippingAddress,
        paymentMethod: updatedCart.paymentMethod,
        itemsPrice: updatedCart.itemsPrice,
        shippingPrice: updatedCart.shippingPrice,
        taxPrice: updatedCart.taxPrice,
        totalPrice: updatedCart.totalPrice,
      })
    );
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2> Shipping </h2>

              <p>
                <strong>Shipping: </strong>
                {updatedCart.shippingAddress.address},{" "}
                {updatedCart.shippingAddress.city}
                {"  "}
                {updatedCart.shippingAddress.postalCode},{"  "}
                {updatedCart.shippingAddress.country}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2> Payment Method </h2>

              <p>
                <strong> Method: </strong>
                {updatedCart.paymentMethod}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2> Order Items </h2>
              {updatedCart.cartItems.length === 0 ? (
                <Alert variant="info">Your cart is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {updatedCart.cartItems.map((Item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={Item.image}
                            alt={Item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${Item.product}`}>
                            {Item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {Item.quantity} X ${Item.price} = $
                          {(Item.quantity * Item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2> Order Summary </h2>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Item:</Col>
                  <Col>${updatedCart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${updatedCart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${updatedCart.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${updatedCart.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                {error && <Alert variant="danger">{error}</Alert>}
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={updatedCart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
