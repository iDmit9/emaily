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
            <main role="main" class="flex-shrink-0">
                  <div className='container'>
                     <Route path='/' exact component={Landing} />
                     <Route path='/surveys' exact component={Dashboard} />
                     <Route path='/surveys/new' component={SurveyNew} />
                  </div>
            </main>
            <footer className="footer mt-auto py-3">
               <div className="container">
                  <span>Emaily realization from Ivanov Dmitriy</span>
               </div>
            </footer>
         </BrowserRouter>
      );
   }
};

export default connect(null, actions)(App);