import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import {Post} from './screens/Post';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/post" component={Post} /> 
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
