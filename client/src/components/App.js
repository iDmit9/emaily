import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Success from './Success';
import Canceled from './Canceled';

class App extends Component {
   componentDidMount() {
      this.props.fetchUser();
   }

   render() {
      return (
         <BrowserRouter>
            <Header />
            <main role="main" className="flex-shrink-0">
               <div className='container'>
                  <Route path='/' exact component={Landing} />
                  <Route path='/surveys' exact component={Dashboard} />
                  <Route path='/surveys/new' component={SurveyNew} />
                  <Route path="/success" component={Success}  />
                  <Route path="/canceled" component={Canceled} />
               </div>
            </main>
            <footer className="footer mt-auto py-3">
               <div className="container">
                  <span>
                     Emaily from Ivanov Dmitriy. The code is available at <a className="text-dark bg-transparent" href='https://github.com/iDmit9'>GitHub</a>.
                  </span>
               </div>
            </footer>
         </BrowserRouter>
      );
   }
};

export default connect(null, actions)(App);