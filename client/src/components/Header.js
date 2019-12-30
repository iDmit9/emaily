import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

import M from "materialize-css/dist/js/materialize.min.js";

class Header extends Component {

   componentDidMount() {
      var elem = document.querySelector(".sidenav");
      M.Sidenav.init(elem, {
         edge: "right",
         inDuration: 250
      });
   }

   renderContent() {
      switch (this.props.auth) {
         case null:
            return;
         case false:
            return (
               <li>
                  <a href='/auth/google'>Login With Google</a>
               </li>
            );
         default:
            return [
               <li key='1'>
                  <Payments />
               </li>,
               <li key='3' style={{ margin: '0 10px' }}>
                  Credits: {this.props.auth.credits}
               </li>,
               <li key='2'>
                  <a href='/api/logout'>Logout</a>
               </li>
            ];
      }
   }

   render() {
      return (
         <header>
            <nav>
               <div className='nav-wrapper container'>
                  <div className='brand-logo left'>
                     <Link
                        to={this.props.auth ? "/surveys" : "/"}
                        className=''
                     >
                        Emaily
                     </Link>
                  </div>
                  <ul className='right hide-on-med-and-down'>
                     {this.renderContent()}
                  </ul>
                  <a href="#menu" data-target="nav-mobile" className="sidenav-trigger black-text right">
                     <i className="material-icons">menu</i>
                  </a>
               </div>
               <ul id="nav-mobile" className="sidenav">
                  <div className='black-text center'>
                     {this.renderContent()}
                  </div>
               </ul>

            </nav>
         </header>
      )
   }
}

function mapStateToProps(state) {
   return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);