import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login',{email: userEmail, password: userPassword});
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);    
}

const getAllClinics = (inputId) => {
    return axios.get(`/api/get-all-clinic?id=${inputId}`);    
}

const getAllDetailClinics = (inputId) => {
    return axios.get(`/api/get-detail-clinic?id=${inputId}`);    
}

const getClinicHomeService = (limit) => {
    return axios.get(`/api/top-clinic-home?limit=${limit}`);    
}

const createNewUserService= (data) => {
    return axios.post('/api/create-new-user',data);
}

const createNewClinicService= (data) => {
    return axios.post('/api/create-new-clinic',data);
}

const createNewDetailClinicService= (data) => {
    return axios.post('/api/create-detail-clinic',data);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule',data);
}

const deleteUserService= (userId) => {
    return axios.delete('/api/delete-user',{
        data: {
            id: userId,
        }
    })
}

const deleteClinicService= (clinicId) => {
    return axios.delete('/api/delete-clinic',{
        data: {
            id: clinicId,
        }
    })
}

const editUserService= (inputdata) => {
    return axios.put('/api/edit-user',inputdata);
}

const editClinicService= (inputdata) => {
    return axios.put('/api/edit-clinic',inputdata);
}

const getAllCodeService= (inputtype) => {
    return axios.get(`/api/allcode?type=${inputtype}`); 
}

const getScheduleDoctorByDate= (doctorId,date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`); 
}

const postPatientBookAppointment= (data) => {
    return axios.post('/api/patient-book-appointment',data);
}

const postVerifyBookAppointment= (data) => {
    return axios.post('/api/verify-book-appointment',data);
}

const getAllPatientForDoctor= (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`); 
}

const postSendRemedy= (data) => {
    return axios.post('/api/send-remedy',data);
}


export { handleLoginApi, getAllUsers,
     createNewUserService, deleteUserService, editUserService, 
     getAllCodeService, getAllClinics, createNewClinicService, 
     deleteClinicService, editClinicService, getClinicHomeService, 
     createNewDetailClinicService,getAllDetailClinics, saveBulkScheduleDoctor, 
     getScheduleDoctorByDate, postPatientBookAppointment, postVerifyBookAppointment, 
     getAllPatientForDoctor, postSendRemedy } 