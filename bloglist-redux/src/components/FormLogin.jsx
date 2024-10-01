import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/loginReducer";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
    setPassword("");
    setUsername("");
    navigate("/");
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </>
  );
};

export default FormLogin;
