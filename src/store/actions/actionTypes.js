const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    // //admin
    // ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    // ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    // PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',


    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIDED: 'FETCH_GENDER_FAIDED',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIDED: 'FETCH_ROLE_FAIDED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIDED: 'CREATE_USER_FAIDED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIDED: 'DELETE_USER_FAIDED',

    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAIDED: 'FETCH_ALL_USER_FAIDED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIDED: 'EDIT_USER_FAIDED',


    FETCH_AREA_SUCCESS: 'FETCH_AREA_SUCCESS',
    FETCH_AREA_FAIDED: 'FETCH_AREA_FAIDED',

    CREATE_CLINIC_SUCCESS: 'CREATE_CLINIC_SUCCESS',
    CREATE_CLINIC_FAIDED: 'CREATE_CLINIC_FAIDED',

    DELETE_CLINIC_SUCCESS: 'DELETE_CLINIC_SUCCESS',
    DELETE_CLINIC_FAIDED: 'DELETE_CLINIC_FAIDED',

    FETCH_ALL_CLINIC_SUCCESS: 'FETCH_ALL_CLINIC_SUCCESS',
    FETCH_ALL_CLINIC_FAIDED: 'FETCH_ALL_CLINIC_FAIDED',

    EDIT_CLINIC_SUCCESS: 'EDIT_CLINIC_SUCCESS',
    EDIT_CLINIC_FAIDED: 'EDIT_CLINIC_FAIDED',

    FETCH_TOP_CLINIC_SUCCESS: 'FETCH_TOP_CLINIC_SUCCESS',
    FETCH_TOP_CLINIC_FAIDED: 'FETCH_TOP_CLINIC_FAIDED',

    CREATE_DETAIL_CLINIC_SUCCESS: 'CREATE_DETAIL_CLINIC_SUCCESS',
    CREATE_DETAIL_CLINIC_FAIDED: 'CREATE_DETAIL_CLINIC_FAIDED',

    FETCH_DETAIL_CLINIC_SUCCESS: 'FETCH_DETAIL_ALL_CLINIC_SUCCESS',
    FETCH_DETAIL_ALL_CLINIC_FAIDED: 'FETCH_DETAIL_ALL_CLINIC_FAIDED',

    FETCH_TIME_SUCCESS: 'FETCH_TIME_SUCCESS',
    FETCH_TIME_FAIDED: 'FETCH_TIME_FAIDED',

})

export default actionTypes;