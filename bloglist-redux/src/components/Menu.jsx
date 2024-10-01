import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { logoutUser } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 5,
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return null;
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto d-flex align-items-center">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link as="span">
            {`${user.name} is logged in`} {""}
            <Button variant="danger" onClick={handleLogout}>
              logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
