import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) {
    return null;
  }

  if (notification.type === "success") {
    return (
      <Alert className="m-2" variant="success">
        {notification.message}
      </Alert>
    );
  } else {
    return (
      <Alert className="m-2" variant="danger">
        {notification.message}
      </Alert>
    );
  }
};

export default Notification;
