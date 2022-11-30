import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender:false,
    genders:[],
    roles:[],
    positions:[],
    users:[],
    topClinics:[],
    areas:[],
    clinics:[],
    times:[]

}

const adminReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGender = true;
            return {
                ...copyState        
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state 
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAIDED:
                state.users = [];
                return {
                    ...state
                }
        case actionTypes.FETCH_AREA_SUCCESS:
            state.areas = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_AREA_FAIDED:
            state.areas = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.clinics = action.clinics;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CLINIC_FAIDED:
                state.clinics = [];
                return {
                    ...state
                }
        case actionTypes.FETCH_TOP_CLINIC_SUCCESS:
            state.topClinics = action.dataClinics;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_CLINIC_FAIDED:
                state.topClinics = [];
                return {
                    ...state
                }

        case actionTypes.FETCH_TIME_SUCCESS:
            state.times = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TIME_FAIDED:
            state.times = [];
            return {
                ...state
            }
        

        default:
            return state;
    }
}




export default adminReducer;