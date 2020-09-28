import React from "react";
import { useSelector } from 'react-redux';

const Landing = (props) => {
   const auth = useSelector(state => {
      return state.auth;
   });
   
   if (auth) {
      props.history.push('/surveys');
   }

   return (
      <div className="container text-center">
         <h1>Emaily!</h1>
         <p className="font-weight-light">Collect feedback from your users    </p>
      </div>
   );
};

export default Landing;