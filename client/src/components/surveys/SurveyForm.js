//SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router-dom';
import SurveyField from "./SurveyField";
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

class SurveyForm extends Component {

   renderFields() {
      return _.map(formFields, ({ label, name }) => {
         return <Field key={name} component={SurveyField} type='text' label={label} name={name} />
      })
   }

   render() {
      return (
         <form
            className='p-3 col-12 col-md-10 col-lg-8 p-md-5 mx-auto'
            onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
         >
            {this.renderFields()}
            <div className='row mx-1 pt-3 my-4'>
               <Link to='/surveys' className='btn btn-danger'>
                  Cancel
            </Link>
               <button type='submit' className="btn ml-auto btn-primary">
                  Next <i className='ml-1'><FontAwesomeIcon icon={faArrowRight} /></i>
               </button>
            </div>
         </form>
      );
   }
}

function validate(values) {
   const errors = {};

   errors.recipients = validateEmails(values.recipients || '');

   _.each(formFields, ({ name }) => {
      if (!values[name]) {
         errors[name] = 'You must provide a value';
      }
   });

   return errors;
}

export default reduxForm({
   validate,
   form: "surveyForm",
   destroyOnUnmount: false
})(SurveyForm);