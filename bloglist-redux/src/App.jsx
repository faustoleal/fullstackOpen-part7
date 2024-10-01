import { useEffect } from "react";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import FormLogin from "./components/FormLogin";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  initializeBlogs,
  votedBlog,
  removeBlog,
  commentBlog,
} from "./reducers/blogReducer";
import { initializeLogin } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";
import Menu from "./components/Menu";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const login = useSelector((state) => state.login);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, [dispatch]);

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject));
  };

  const addLike = (id) => {
    const blogToUpdate = [...blogs].find((b) => b.id === id);
    dispatch(votedBlog(blogToUpdate));
  };

  const addComment = (comment) => {
    dispatch(commentBlog(comment));
  };

  const deleteBlog = (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    if (window.confirm(`Delete ${blogToDelete.title} ?`)) {
      dispatch(removeBlog(blogToDelete));
      navigate("/");
    } else {
      dispatch(setNotification("Operation canceled", "danger"));
    }
  };

  const sortBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const navigate = useNavigate();

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? [...blogs].find((b) => b.id === matchBlog.params.id)
    : null;

  const matchUser = useMatch("/users/:id");
  const user = matchUser
    ? [...users].find((u) => u.id === matchUser.params.id)
    : null;

  return (
    <div className="container">
      <Menu user={login} />
      <Notification />

      {login === null ? (
        <FormLogin />
      ) : (
        <>
          <br />
          <Routes>
            <Route
              path="/"
              element={<BlogList addBlog={addBlog} blogs={sortBlogs} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blog={blog}
                  addLike={() => addLike(blog.id)}
                  deleteBlog={() => deleteBlog(blog.id)}
                  addComment={addComment}
                  user={login}
                />
              }
            />
            <Route path="/users" element={<UserList users={users} />} />
            <Route path="/users/:id" element={<User user={user} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
