import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(
    () => {
      if (!userInfo) {
        history.push("/login");
      } else {
        if (!user.name) {
          dispatch(getUserDetails("profile"));
        } else {
          setName(user.name);
          setEmail(user.email);
          setState(user.state);
          setCity(user.city);
        }
      }
    },
    [history, userInfo, user, dispatch],
    dispatch
  );
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
     
      dispatch(updateUserProfile({ id: user._id, name, email, state, city, password }));
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h2> User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="state">
            <Form.Label> State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label> City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
