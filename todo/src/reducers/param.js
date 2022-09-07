import {
    ADD_DATA,
    GET_DATA,
    DELETE_PARAM
} from '../actions/types';
// import update from 'react-addons-update';

const initialState = {
    data_arr: [
        {"name": "Resource Name", "value": "4 hour"},
        {"name": "Rated Power", "value": 10.0},
        {"name": "Rated Duration", "value": 4.0},
        {"name": "Max Charge", "value": 10.0},
        {"name": "Max Discharge, MW", "value": 10.0},
        {"name": "Battery Charge Loss, % (0-100)", "value": 7.0},
        {"name": "Battery Discharge Loss, % (0-100)", "value": 7.0},
        {"name": "VOM. $/MWh", "value": 5.0}
    ],
    default_params: {
        "resource_id": 1,
        "reporting_name": "4 hour",
        "ui_rated_power_mw": 10.0,
        "ui_rated_duration_hr": 4.0,
        "max_discharge_mw": 10.0,
        "max_charge_mw": 10.0,
        "min_storage_mwh": 0.0,
        "max_storage_mwh": 40.0,
        "charge_loss": 7.0,
        "discharge_loss": 7.0,
        "vom_dollars_per_mwh": 5.0
    }
};

function paramReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_DATA:
            return {
                ...state,
                data_arr: [payload, ...state.data_arr]
            };
        case GET_DATA:
            return {
                ...state,
                data_arr: [...state.data_arr]
            };
        case DELETE_PARAM:
            return {
                ...state,
                data_arr: state.data_arr.filter((param) => param.name !== payload)
            };
        default:
            return state;
  }
}

export default paramReducer;