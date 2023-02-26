import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
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
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

function OrderScreen({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const match = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [sdkReady, setSdkReady] = useState(false);

  const orderId = match.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }

  const addPaypalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AduPBi7a4FUT2zww3hdMMZkUhjfHS9XkQVNQ7MjomxzJfVUJJWEPHRhGJmcgevsQhwN6aRaWuxEc9TI-";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {

    if (!userInfo) {
      navigate('/login');
    }

    
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));

    // Save the order details to local storage
    const orderDetails = JSON.stringify(order);
    localStorage.setItem("orderDetails", orderDetails);
  };

  const deliverHandler = (paymentResult) => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2> Shipping </h2>
              <p>
                <strong>Name: </strong> {order.user.name}{" "}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>{" "}
              </p>

              {order.isDelivered ? (
                <Alert variant="success">
                  {" "}
                  Delivered on {order.deliveredAt}{" "}
                </Alert>
              ) : (
                <Alert variant="warning">Not Delivered</Alert>
              )}

            </ListGroupItem>

            <ListGroupItem>
              <h2> Payment Method </h2>

              <p>
                <strong> Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert variant="success"> Paid on {order.paidAt} </Alert>
              ) : (
                <Alert variant="warning">Not Paid</Alert>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2> Order Items </h2>
              {order.orderItems.length === 0 ? (
                <Alert variant="info">Order is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((Item, index) => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AduPBi7a4FUT2zww3hdMMZkUhjfHS9XkQVNQ7MjomxzJfVUJJWEPHRhGJmcgevsQhwN6aRaWuxEc9TI-",
                      }}
                    >
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.totalPrice,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={successPaymentHandler}
                      ></PayPalButtons>
                    </PayPalScriptProvider>
                  )}
                </ListGroupItem>
              )}
            </ListGroup>

            {loadingDeliver && <Loader/>}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroupItem>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroupItem>
              )}

              

              
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
