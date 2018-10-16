import React, { Component } from 'react'
import PropTypes from "prop-types";
import logo from "../../img/logo.png" 
export default class header extends Component {
  render() {
    return (
      <div>
         <header className="header menu_2">
      <div id="preloader">
          <div data-loader="circle-side"></div>
        </div>
      <div id="logo">
      
           <a href="/">
             <img
               src={logo}
               style ={{width :"149", height:"42" }}
               alt="Dikky"
             />
           </a>
         </div>
         <a href="#menu" className="btn_mobile">
       <div className="hamburger hamburger--spin" id="hamburger">
         <div className="hamburger-box">
           <div className="hamburger-inner"></div>
         </div>
       </div>
     </a>
     <nav id="menu" className="main-menu">
       <ul>
         <li><span><a href="/">Home</a></span>
         </li>
         <li><span><a href="/courses">Courses</a></span></li>
         <li><span><a href="/login">Login</a></span></li>
         <li><span><a href="/register">Register</a></span></li>
         <li><span><a href="/cart">Cart</a></span></li>
       </ul>
     </nav>
     <div className="search-overlay-menu">
       <span className="search-overlay-close"><span className="closebt"><i className="ti-close"></i></span></span>
       <form role="search" id="searchform">
         <input placeholder="Search..." type="search" />
         <button type="submit"><i className="icon_search"></i>
         </button>
       </form>
     </div>
      </header>
      </div>
    )
  }
}
