import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h1>Wellcome To Social World {userInfo && (userInfo.name) }   </h1>
      </Col>
    </Row>
  );
};

export default HomeScreen;
