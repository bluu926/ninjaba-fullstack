import { AUTH_USER,  
         UNAUTH_USER,
         AUTH_ERROR,
         PROTECTED_TEST,
         ADD_PLAYER,
         ERROR } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false}

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true, user: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
    case ADD_PLAYER:
      return { ...state, error: '', message: '', authenticated: true };
    case ERROR:
      return { ...state, error: action.payload };    
  }

  return state;
}