import actionTypes from './actionTypes';
import {getAllCodeService, createNewUserService,getAllUsers,deleteUserService, editUserService,
    getAllClinics, createNewClinicService, deleteClinicService, editClinicService,
     getClinicHomeService, createNewDetailClinicService, 
} from "../../services/userService";
import {toast} from "react-toastify";

export const fetchGenderStart = () =>{
    return async (dispatch, getState )=>{
        try{
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed());
            }
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log(e);
        }
    }
}

export const fetchRoleStart = () =>{
    return async (dispatch, getState )=>{
        try{
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed());
            }
        }catch(e){
            dispatch(fetchRoleFailed());
            console.log(e);
        }
    }
}

export const fetchAreaStart = () =>{
    return async (dispatch, getState )=>{
        try{
            let res = await getAllCodeService("AREA");
            if(res && res.errCode === 0){
                dispatch(fetchAreaSuccess(res.data))
            }else{
                dispatch(fetchAreaFailed());
            }
        }catch(e){
            dispatch(fetchAreaFailed());
            console.log(e);
        }
    }
}

export const fetchTimeStart = () =>{
    return async (dispatch, getState )=>{
        try{
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                dispatch(fetchTimeSuccess(res.data))
            }else{
                dispatch(fetchTimeFailed());
            }
        }catch(e){
            dispatch(fetchTimeFailed());
            console.log(e);
        }
    }
}


export const createNewuser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode ===0){
                toast.success("Create a new user success");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFailed());
            }
        }catch(e){
            dispatch(saveUserFailed());
            console.log(e);
        }
    }
    
}

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUsers("ALL");
            if(response && response.errCode ===0){
                dispatch(fetchAllUserSuccess(response.users.reverse()));
            }else{
                toast.error("Fetch all users error!");
                dispatch(fetchAlUserFailed());
            }
        }catch(e){
            toast.error("Fetch all users error!");
            dispatch(fetchAlUserFailed());
            console.log(e);
        }
    }
    
}

export const deleteUserRedux = (userId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUserService(userId);
            if(response && response.errCode ===0){
                toast.success("Delete the user sucess")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("delete users error!");
                dispatch(deleteUserFailed());
            }
        }catch(e){
            toast.error("delete users error!");
            dispatch(deleteUserFailed());
            console.log(e);
        }
    }
    
}

export const editUserRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await editUserService(data);
            if(response && response.errCode ===0){
                toast.success("Update the user sucess")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Update users error!");
                dispatch(editUserFailed());
            }
        }catch(e){
            toast.error("Update users error!");
            dispatch(editUserFailed());
            console.log(e);
        }
    }
    
}


export const createNewclinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewClinicService(data);
            if(response && response.errCode ===0){
                toast.success("Create a new Pitch success");
                dispatch(saveClinicSuccess());
                dispatch(fetchAllClinicsStart());
            }else{
                dispatch(saveClinicFailed());
            }
        }catch(e){
            dispatch(saveClinicFailed());
            console.log(e);
        }
    }
    
}

export const createNewDetailclinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createNewDetailClinicService(data);
            if(response && response.errCode ===0){
                toast.success("Create a new Pitch success");
                dispatch(saveDetailClinicSuccess());
            }else{
                dispatch(saveDetailClinicFailed());
            }
        }catch(e){
            dispatch(saveDetailClinicFailed());
            console.log(e);
        }
    }
    
}

export const fetchAllClinicsStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllClinics("ALL");
            let res1 = await getClinicHomeService(3);
            console.log('check clinic home',res1)
            if(response && response.errCode ===0){
                dispatch(fetchAllClinicSuccess(response.clinics.reverse()));
            }else{
                toast.error("Fetch all users error!");
                dispatch(fetchAlClinicFailed());
            }
        }catch(e){
            toast.error("Fetch all users error!");
            dispatch(fetchAlClinicFailed());
            console.log(e);
        }
    }
    
}




export const fetchTopClinic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getClinicHomeService('');
            if(res && res.errCode ===0){
                dispatch({
                    type: actionTypes.FETCH_TOP_CLINIC_SUCCESS,
                    dataClinics: res.data
                });
            }else{
                
                dispatch({
                    type: actionTypes.FETCH_TOP_CLINIC_FAIDED
                });
            }
        }catch(e){
            dispatch({
                type: actionTypes.FETCH_TOP_CLINIC_FAIDED
            });
            console.log(e);
        }
    }
    
}

export const deleteClinicRedux = (userId) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteClinicService(userId);
            if(response && response.errCode ===0){
                toast.success("Delete the user sucess")
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllClinicsStart());
            }else{
                toast.error("delete users error!");
                dispatch(deleteClinicFailed());
            }
        }catch(e){
            toast.error("delete users error!");
            dispatch(deleteClinicFailed());
            console.log(e);
        }
    }
    
}

export const editClinicRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await editClinicService(data);
            if(response && response.errCode ===0){
                toast.success("Update the user sucess")
                dispatch(editClinicSuccess());
                dispatch(fetchAllClinicsStart());
            }else{
                toast.error("Update users error!");
                dispatch(editClinicFailed());
            }
        }catch(e){
            toast.error("Update users error!");
            dispatch(editClinicFailed());
            console.log(e);
        }
    }
    
}






export const fetchGenderSuccess = (genderData) =>({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () =>({
    type: actionTypes.FETCH_GENDER_FAIDED,
})
export const fetchRoleSuccess = (roleData) =>({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () =>({
    type: actionTypes.FETCH_ROLE_FAIDED,
})

export const fetchAreaSuccess = (areaData) =>({
    type: actionTypes.FETCH_AREA_SUCCESS,
    data: areaData
})
export const fetchAreaFailed = () =>({
    type: actionTypes.FETCH_AREA_FAIDED,
})

export const fetchTimeSuccess = (timeData) =>({
    type: actionTypes.FETCH_TIME_SUCCESS,
    data: timeData
})
export const fetchTimeFailed = () =>({
    type: actionTypes.FETCH_TIME_FAIDED,
})


export const saveUserSuccess = () =>({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailed = () =>({
    type: actionTypes.CREATE_USER_FAIDED,
})
export const fetchAllUserSuccess = (data) =>({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users:data
})
export const fetchAlUserFailed = () =>({
    type: actionTypes.FETCH_ALL_USER_FAIDED,
})
export const deleteUserSuccess = () =>({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () =>({
    type: actionTypes.DELETE_USER_FAIDED,
})
export const editUserSuccess = () =>({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () =>({
    type: actionTypes.EDIT_USER_FAIDED,
})


export const saveClinicSuccess = () =>({
    type: actionTypes.CREATE_CLINIC_SUCCESS,
})
export const saveClinicFailed = () =>({
    type: actionTypes.CREATE_CLINIC_FAIDED,
})

export const saveDetailClinicSuccess = () =>({
    type: actionTypes.CREATE_DETAIL_CLINIC_SUCCESS,
})
export const saveDetailClinicFailed = () =>({
    type: actionTypes.CREATE_DETAIL_CLINIC_FAIDED,
})

export const fetchAllClinicSuccess = (data) =>({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    clinics:data
})
export const fetchAlClinicFailed = () =>({
    type: actionTypes.FETCH_ALL_CLINIC_FAIDED,
})
export const deleteClinicSuccess = () =>({
    type: actionTypes.DELETE_CLINIC_SUCCESS,
})
export const deleteClinicFailed = () =>({
    type: actionTypes.DELETE_CLINIC_FAIDED,
})
export const editClinicSuccess = () =>({
    type: actionTypes.EDIT_CLINIC_SUCCESS,
})
export const editClinicFailed = () =>({
    type: actionTypes.EDIT_CLINIC_FAIDED,
})

