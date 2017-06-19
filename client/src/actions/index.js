import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import { AUTH_USER,  
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST,
         ADD_PLAYER,
         ERROR } from './types';

const API_URL = 'https://ben-test-ninja.herokuapp.com/api';
const CLIENT_ROOT_URL = 'https://ben-test-ninja.herokuapp.com';

export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function loginUser({ username, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/login`, { username, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ 
        type: AUTH_USER,
        payload: response.data.user
      });
      window.location.href = CLIENT_ROOT_URL + '/#/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }

export function registerUser({ email, username, firstName, lastName, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, username, firstName, lastName, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ 
        type: AUTH_USER,
        payload: response.data.user
      });
      window.location.href = CLIENT_ROOT_URL + '/#/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser() {  
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/#/login';
  }
}

export function protectedTest() {  
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function loadPlayersFromServer() {  
  return function(dispatch) {
    axios.get(`${API_URL}/auth/players`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function addPlayer(playerId, username) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/add/${playerId}/${username}`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: ADD_PLAYER
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, ERROR)
    });
  }
}