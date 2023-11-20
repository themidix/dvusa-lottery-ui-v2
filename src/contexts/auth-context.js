import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import HomeStore from '../store/global.store';
import Jwt from 'jsonwebtoken';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const {
    isSubmitingLoading,
    isAuthentificated,
    setIsAuthentificated,
    setIsSubmitingLoading
  } = HomeStore();

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
      window.localStorage.clear();
      window.sessionStorage.clear();
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {             
        const data = await response.json();
        toast.success('Connecté avec succès');

        setTimeout(()=>{
          const token = data.accessToken;
          const secret = "myPrivateSecret";
          const decodedToken = Jwt.decode(token, secret);
          const {exp, roles, sub}  = decodedToken;

          window.localStorage.setItem("userName", sub);
          window.localStorage.setItem("userRoles", roles[0]);
          window.localStorage.setItem("exp", (parseInt(exp) * 1000));
          window.localStorage.setItem("token", data.accessToken);
          window.localStorage.setItem("refreshToken", data.refreshToken);  
          
          //Session
          window.sessionStorage.setItem("userName", sub);
          window.sessionStorage.setItem("userRoles", roles[0]);
          window.sessionStorage.setItem("exp", (parseInt(exp) * 1000));
          window.sessionStorage.setItem("token", data.accessToken);
          window.sessionStorage.setItem("refreshToken", data.refreshToken);   
                
          setIsSubmitingLoading(false);
          setIsAuthentificated(true);
        }, 3000);
        
      }else{
        toast.error("Nom d'utilisateur ou mot de passe incorrecte, veuillez réessayer");
        setIsSubmitingLoading(false);
        throw new Error('Veuillez, s\'il vous plait verifier votre adresse mail ou votre mot de passe');
      }
    } catch (err) {      
      setIsSubmitingLoading(false);
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: err.message });
      helpers.setSubmitting(false);
      throw new Error('Quelque chose s\'est mal passee, veuillez réessayer plus tard');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };
  

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
