import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
   return (
      <div className='mb-4'>
         <SurveyList />
         <Link to='/surveys/new' className='position-fixed btn btn-lg p-4 btn-danger custom-rounded-btn text-light rounded-circle'>
            <i className='px-1'><FontAwesomeIcon icon={faPlus} /></i>
         </Link>
      </div>
   )
}

export default Dashboard;