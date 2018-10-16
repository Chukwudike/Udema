import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Link } from "react-router-dom";

 class Login extends Component {

	state = {

	}

  render() {

    return (
      <body id="login_bg">
      	<nav id="menu" class="fake_menu"></nav>
          <div id="login">
        <aside>
			<figure>
				<a href="/"><img src="img/logo.png" width="149" height="42" data-retina="true" alt=""/></a>
			</figure>
			  <form>
				<div className="form-group">
					<span className="input">
					<input className="input_field" type="email" autoComplete="off" name="email"/>
						<label className="input_label">
						<span className="">Your email</span>
					</label>
					</span>

					<span className="input">
					<input className="input_field" type="password" autoComplete="new-password" name="password"/>
						<label className="input_label">
						<span className="">Your password</span>
					</label>
					</span>
					<small><Link to="forget_password">Forgot password?</Link></small>
				</div>
			  <input
                type="submit"
                className="btn_1 rounded full-width add_top_30"
                value="Login"
              />
				<div className="text-center add_top_10">New to Udema? <strong><Link to="/register">Sign up!</Link></strong></div>
			</form>
			<div className="copy">© 2017 Udema</div>
		</aside>
        </div>
      </body>
    )
  }
}

const mapStateToProps = state => ({
	errors : state.errors,

})

export default Login