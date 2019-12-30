import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
   componentDidMount() {
      this.props.fetchUser();
   }

   render() {
      return (
         <BrowserRouter>
            <Header />
            <main className='container'>
               <div>
                  <Route path='/' exact component={Landing} />
                  <Route path='/surveys' exact component={Dashboard} />
                  <Route path='/surveys/new' component={SurveyNew} />
               </div>
            </main>
            <footer className="page-footer">
               <div className="container grey-text text-lighten-3">
                  <div className="row">
                     <p>Emaily realization from Ivanov Dmitriy</p>
                  </div>
               </div>
            </footer>
         </BrowserRouter>
      );
   }
};

export default connect(null, actions)(App);