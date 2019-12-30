import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {
   componentDidMount() {
      this.fetchSurveyHandler();
   }

   fetchSurveyHandler() {
      this.props.fetchSurveys();
   }

   deleteSurveyHandler(Id) {
      this.props.deleteSurvey(Id);
      this.fetchSurveyHandler();
   }

   renderSurveys() {
      return this.props.surveys.reverse().map(survey => {
         return (
            <div className='card' key={survey._id}>
               <div className='card-content'>
                  <div className="card-badges right grey-text ">
                     <p>
                        Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                     </p>
                     {survey.lastResponded &&
                        <p>
                           last Responded: {new Date(survey.lastResponded).toLocaleDateString()}
                        </p>
                     }
                  </div>
                  <span className='card-title'>{survey.title}</span>
                  <p>
                     {survey.body}
                  </p>

               </div>
               <div className='card-content grey lighten-5'>
                  <p className='brown-text text-lighten-1'>
                     YES: {survey.yes}
                     <span className="bar">&nbsp;|&nbsp;</span>
                     NO: {survey.no}
                     <button
                        onClick={(Id) => this.deleteSurveyHandler(survey._id)}
                        className='btn-floating btn-small btn-flat right transparent waves-effect'
                     >
                        <i className='material-icons center black-text'>delete_forever</i>
                     </button>
                  </p>
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

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList)