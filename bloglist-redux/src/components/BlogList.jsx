import FormBlog from "./FormBlog";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const BlogList = ({ addBlog, blogs }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <br />
      <Togglable buttonLabel="new blog">
        <FormBlog createBlog={addBlog} />
      </Togglable>
      <br />
      <Table bordered hover>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
