import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, /*DELETE_SURVEY*/ } from "./types";

export const fetchUser = () => async dispatch => {
   const res = await axios.get("/api/current_user");

   dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
   const res = await axios.post("/api/stripe", token);

   dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
   const res = await axios.post('/api/surveys', values);

   history.push('/surveys')
   dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = (sortField) => async dispatch => {
   const res = await axios.get('/api/surveys', {
      params: {
         sortField: sortField
      }
   });

   dispatch({ type: FETCH_SURVEYS, payload: res.data })
};

export const deleteSurvey = (surveyId) => async dispatch => {
   await axios.delete('/api/delete-survey', { data: { Id: surveyId } });

   //I think we don't need return anything
   // dispatch({ type: DELETE_SURVEY, payload: res.data })
};