import { ListGroup } from "react-bootstrap";

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <br />
      <h4>added blogs</h4>
      <br />
      <ListGroup as="ol" numbered>
        {user.blogs.map((blog) => (
          <ListGroup.Item as="li" variant="info" key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
