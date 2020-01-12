//SurveyFormReview show users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
   const reviewFields = _.map(formFields, ({ name, label }) => {
      return (
         <div className='pt-3' key={name}>
            <label className='mb-0 text-muted'><small>{label}</small></label>
            <div>
               {formValues[name]}
            </div>
         </div>
      )
   })

   return (
      <div className='p-3 col-12 col-md-10 col-lg-8 p-md-5 mx-auto'>
         <h5>Please confirm your entries</h5>
         {reviewFields}
         <div className='row mx-1 pt-3 my-4'>
            <button className='btn btn-danger' onClick={onCancel}>
               Back
            </button>
            <button
               onClick={() => submitSurvey(formValues, history)}
               className="btn ml-auto btn-success"
            >
               Send Survey <i className='ml-1'><FontAwesomeIcon icon={faEnvelope} /></i>
            </button>
         </div>
      </div>
   )
};

function mapStateToProps(state) {
   return {
      formValues: state.form.surveyForm.values
   };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));