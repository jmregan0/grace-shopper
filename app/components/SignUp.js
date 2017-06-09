import React from 'react';
import {Link} from 'react-router';
import store from '../store';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render(){
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
          <div className="form-group">
              <label>name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onSignupSubmit(evt) {
    const { message } = this.props;
    evt.preventDefault();
    this.props.addNewUser({name: evt.target.name.value, email:evt.target.email.value, password:evt.target.password.value})
    console.log(`${message} isn't implemented yet`);
    console.log("new user: ", {name: evt.target.name.value, email:evt.target.email.value, password:evt.target.password.value})
  }
}

export default SignUp;
