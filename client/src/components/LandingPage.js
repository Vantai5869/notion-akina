import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios.get("/posts").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.posts,
        });
        console.log("post: ", this.state.posts);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/posts/delete/${id}`).then((res) => {
      alert(res.data.title + " has been deleted successfully");
      this.getPosts();
    });
  };

  filterContent(posts, searchTerm) {
    const result = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm) ||
        post.postCategory.toLowerCase().includes(searchTerm)
    );
    this.setState({ posts: result });
  }

  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("/posts").then((res) => {
      if (res.data.success) {
        this.filterContent(res.data.posts, searchTerm);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Posts</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchTerm"
              onChange={this.handleTextSearch}
            ></input>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr>
                <th scope="row">{index}</th>

                <td>
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </td>
                <td dangerouslySetInnerHTML={{ __html: post.description }}></td>
                <td>{post.postCategory}</td>
                <td>
                  <Link className="btn btn-warning" to={`/edit/${post._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </Link>
                  &nbsp;
                  <Link
                    className="btn btn-danger"
                    to="#"
                    onClick={() => this.onDelete(post._id)}
                  >
                    <i class="far fa-trash-alt"></i>&nbsp;Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link   to="/add" className="btn btn-success">
          Add New Post
        </Link>
      </div>
    );
  }
}

export default App;
