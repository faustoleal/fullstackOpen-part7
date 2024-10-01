import { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, deleteBlog, user, addLike, addComment }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const writeComment = () => {
    if (comment === "") {
      dispatch(setNotification("empty comment, try again", "danger"));
    } else {
      addComment({
        ...blog,
        comments: [...blog.comments, comment],
      });
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <div className="blog">
        <h1>
          {blog.title} {blog.author}
        </h1>
        <br />
        <a href={blog.url}>{blog.url}</a> <br />
        <p>
          {`${blog.likes} likes`}{" "}
          <Button variant="success" onClick={addLike}>
            likes
          </Button>{" "}
        </p>
        <p>{` added by ${blog.user.name}`}</p>
        {user.username === blog.user.username && (
          <Button variant="danger" onClick={deleteBlog}>
            remove
          </Button>
        )}
        <br />
        <br />
        <h3>Comments</h3>
        <br />
        <Form className="row m-0">
          <Form.Group className="col-sm-4 px-0 m-1">
            <Form.Control
              id="comment"
              type="text"
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
            />
          </Form.Group>
          <Button className="col-sm-3  m-1" onClick={writeComment}>
            add comment
          </Button>
        </Form>
        <ListGroup className="my-2" as="ol" numbered>
          {blog.comments.length > 0 &&
            blog.comments.map((comment) => (
              <ListGroup.Item
                as="li"
                variant="light"
                key={blog.comments.lastIndexOf(comment)}
              >
                {comment}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </>
  );
};

export default Blog;
