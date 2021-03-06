import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/api/gatherings')
      .then(json => {
        console.log(json.data);
        this.setState({ data: json.data });
      })
  }

  addComment(event) {
    event.preventDefault();
    console.log(this.refs.comment.value);
  }

  render() {
    return (
      <div className="App">
        <h1>React APP!</h1>
        {this.state.data.map(gath => (
          <div key={gath._id}>
            <h2>{gath.name}</h2>
            <h4>{gath.description}</h4>
            <h4>Date Created: {gath.dateCreated}</h4>
            <h4>Date Hosted: {gath.dateHosted}</h4>
            <h3>Comments</h3>
            {gath.comments.map(comment => (
              <div key={comment._id}>
                {comment.user.userName}: "{comment.message}"
              </div>
            ))}
            <form onSubmit={this.addComment}>
              <input
                type="text"
                id="content"
                placeholder="Add a comment"
                ref= "comment"
              />
              <button className="btn btn-primary" type="submit">
                Post
              </button>
            </form>

          </div>

        ))}
      </div>
    );
  }
}

export default App;
