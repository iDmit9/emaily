import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
   state = {
      isCollapsed: false
   }

   changeCollapseHandler = () => {
      this.setState(prevState => {
         return {
            isCollapsed: !prevState.isCollapsed
         }
      })
   }

   renderContent() {
      switch (this.props.auth) {
         case null:
            return;
         case false:
            return (
               <li className="nav-item">
                  <a className="nav-link text-light" href='/auth/google'>Login With Google</a>
               </li>
            );
         default:
            return [
               <li className="nav-item" key='1'>
                  <Payments />
               </li>,
               <li className="nav-item" key='3'>
                  <p className="nav navbar-text text-light mx-md-3">Credits: {this.props.auth.credits}</p>
               </li>,
               <li className="nav-item" key='2'>
                  <a className="nav-link text-light bg-transparent" href='/api/logout'>Logout</a>
               </li>
            ];
      }
   }

   render() {
      const navbarTogglerClass = `navbar-toggler text-dark ${this.state.isCollapsed && 'collapsed'}`;
      const navbarClass = `navbar-collapse ${!this.state.isCollapsed && 'collapse'}`;

      return (
         <header className='shadow-sm' >{/*double small shadow looks better than 1 large*/}
            <nav className="shadow-sm navbar navbar-expand-md navbar-dark text-light nav-bg-prime ">
               <div className='container text-light'>
                  <Link
                     to={this.props.auth ? "/surveys" : "/"}
                     className='navbar-brand'
                  >
                     Emaily
                  </Link>

                  <button onClick={this.changeCollapseHandler} className={navbarTogglerClass} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className={navbarClass} id="navbarNav">
                     <ul className='navbar-nav ml-auto'>
                        {this.renderContent()}
                     </ul>
                  </div>
               </div>
            </nav>
         </header>
      )
   }
}

function mapStateToProps(state) {
   return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);