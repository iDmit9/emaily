// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
// import { Form } from 'react-final-form'
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
   state = {
      showFormReview: false,
      values: {}
   };

   renderContent() {
      if (this.state.showFormReview) {
         return <SurveyFormReview values={this.state.values} onCancel={() => this.setState({ showFormReview: false })} />;
      }

      return <SurveyForm values={this.state.values}  onSurveySubmit={(values) => this.setState({values: values, showFormReview: true })} />;
   }

   render() {
      return (
         <>
            {this.renderContent()}
         </>
      );
   }
}

export default SurveyNew;