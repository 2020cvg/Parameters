import {
    DELETE_PARAM,
    ADD_DATA,
    GET_DATA,
  } from './types';

// Add data
export const addData = (formData) => async (dispatch) => {
  dispatch({
      type: ADD_DATA,
      payload: formData
  });
};

// Get data
export const getData = () => async (dispatch) => {
  dispatch({
      type: GET_DATA
  });
};

// Delete param
export const deleteParam = (name) => async (dispatch) => {
    dispatch({
      type: DELETE_PARAM,
      payload: name
    });
}

