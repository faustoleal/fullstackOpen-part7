import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FormBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          create
        </Button>
      </Form>
    </>
  );
};

export default FormBlog;
