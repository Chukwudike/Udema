import React, {Component}from 'react'
import PropTypes from "prop-types";
import Header from "./header"
import Search from "./search_section";
import Footer from "./footer"

class Landing extends Component  {
  render () {
    return (
      <div>
     <Header/>
    <Search/>
    <Footer/>
    </div>
    )
  }
  
}

export default Landing
