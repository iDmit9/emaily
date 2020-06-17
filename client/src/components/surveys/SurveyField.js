//SurveyField contains logic to render a single label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
   return (
      <div className="form-group mb-0">
         <label htmlFor={`input${input.name}`}>{label}</label>
         <input {...input} id={`input${input.name}`} className='mb-1 form-control' />
         <div className='text-danger mb-3'>
            {touched && error}
         </div>
      </div>
   );
};