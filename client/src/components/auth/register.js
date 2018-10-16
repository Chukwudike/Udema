import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import Alert from "../common/Alert";
import {registerUser} from "../../actions/authActions"


class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    alert: false,
    errors: {}
  };

  static getDerivedStateFromProps (nextProps, prevState) {
    if(nextProps.errors !== prevState.errors) {
      return {errors : nextProps.errors}
    }
    return null
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevProps.errors !== this.state.errors){

  //   }
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ alert: false });
    if (this.state.password !== this.state.password2) {
      return this.setState({ alert: true });
    } else {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
      this.props.registerUser(newUser,this.props.history)
    }
  };
  render() {
    const {errors} =  this.state
    return (
      <div id="register_bg">
        <nav id="menu" className="fake_menu" />

        <div id="login">
          <aside>
            <figure>
              <Link to="/">
                <img
                  src="img/logo.png"
                  width="149"
                  height="42"
                  data-retina="true"
                  alt=""
                />
              </Link>
            </figure>
            <form autoComplete="off" onSubmit={this.onSubmit}>
            {errors.email ? (
                    <Alert
                      message={errors.email}
                      messageType="error"
                    />
                  ) : null}
              <div className="form-group">
                <span className="input">
                  <input
                    required
                    name="name"
                    className="input_field"
                    type="text"
                    onChange={this.onChange}
                  />
                  <label className="input_label">
                    <span className="">Your Full Name</span>
                  </label>
                </span>

                <span className="input">
                  <input
                    required
                    name="email"
                    className="input_field"
                    type="email"
                    onChange={this.onChange}
                  />
                  <label className="input_label">
                    <span className="">Your Email</span>
                  </label>
                </span>

                <span className="input">
                  <input
                    required
                    minLength = '6'
                    name="password"
                    className="input_field"
                    type="password"
                    id="password1"
                    onChange={this.onChange}
                  />
                  <label className="input_label">
                    <span className="">Your password</span>
                  </label>
                </span>

                <span className="input">
                  <input
                    required
                    minLength = '6'
                    name="password2"
                    className="input_field"
                    type="password"
                    id="password2"
                    onChange={this.onChange}
                  />
               
                  <label className="input_label">
                    <span className="">Confirm password</span>
                  </label>
                </span>

                <div id="pass-info" className="clearfix" />
              </div>
              {this.state.alert ? (
                    <Alert
                      message="Your password does not match"
                      messageType="error"
                    />
                  ) : null}
              <input
                type="submit"
                className="btn_1 rounded full-width add_top_30"
                value="Register"
              />
              <div className="text-center add_top_10">
                Already have an acccount?{" "}
                <strong>
                  <Link to="/login">Sign In</Link>
                </strong>
              </div>
            </form>
            <div className="copy">© 2017 Udema</div>
          </aside>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect (
  mapStateToProps, { registerUser}
)(withRouter(Register));
