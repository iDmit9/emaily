import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
   componentDidMount() {
      this.props.fetchSurveys();
   }

   renderSurveys() {
      return this.props.surveys.reverse().map(survey => {
         return (
            <div className='card' key={survey._id}>
               <div className='card-content'>
                  <span className='card-title'>{survey.title}</span>
                  <p>
                     {survey.body}
                  </p>
                  <p className='right'>
                     Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                  </p>
               </div>
               <div className='card-action'>
                  <a className='brown-text text-lighten-1'>Yes: {survey.yes}</a>
                  <a className='brown-text text-lighten-1'>No: {survey.no}</a>
               </div>
            </div>
         );
      })
   }

   render() {
      return (
         <div>
            {this.renderSurveys()}
         </div>
      );
   }
}

function mapStateToProps({ surveys }) {
   return { surveys: surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)