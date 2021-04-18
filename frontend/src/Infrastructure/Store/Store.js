import React, {
  createContext, useReducer, useContext,
} from 'react';
import PropTypes from 'prop-types';

const initialState = {
  newApresentation: null,
  allApresentations: null,
  message: {message: null, type: null},
};

export const Store = createContext(initialState);

export const useAppContext = () => useContext(Store);

export function reducer(state, action) {

  switch (action.type) {
    case 'CREATE_APRESENTATION':
      return {
        ...state,
        newApresentation: action.payload.newApresentation,
        allApresentations: action.payload.allApresentations,
    };
    case 'ALL_APRESENTATIONS':
      return {
        ...state,
        allApresentations: action.payload
    };
    case 'REQUEST_ERROR': {
      return {
        ...state,
        message: {message: action.payload, type: "error"}
      }
    }
    default:
      return { ...state };
}
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const { children } = props;
  return (
    <Store.Provider value={value}>
      {children}
    </Store.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};