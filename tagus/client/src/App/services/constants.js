export const constants = {
    config: {
        DATE_FORMAT: 'MMMM Do YYYY, HH:mm'
    },
    content: {
        GET_CONTENT_LIST: 'GET_CONTENT_LIST',
        GET_CONTENT_LIST_PENDING: 'GET_CONTENT_LIST_PENDING',
        GET_CONTENT_LIST_FULFILLED: 'GET_CONTENT_LIST_FULFILLED',
        GET_CONTENT_LIST_REJECTED: 'GET_CONTENT_LIST_REJECTED',
        GET_CONTENT_UNITS_LIST: 'GET_CONTENT_UNITS_LIST',
        GET_CONTENT_UNITS_LIST_PENDING: 'GET_CONTENT_UNITS_LIST_PENDING',
        GET_CONTENT_UNITS_LIST_FULFILLED: 'GET_CONTENT_UNITS_LIST_FULFILLED',
        GET_CONTENT_UNITS_LIST_REJECTED: 'GET_CONTENT_UNITS_LIST_REJECTED',
        GET_CONTENT_DETAIL: 'GET_CONTENT_DETAIL',
        GET_CONTENT_DETAIL_PENDING: 'GET_CONTENT_DETAIL_PENDING',
        GET_CONTENT_DETAIL_FULFILLED: 'GET_CONTENT_DETAIL_FULFILLED', 
        GET_CONTENT_DETAIL_REJECTED: 'GET_CONTENT_DETAIL_REJECTED', 
        GET_CONTENT_DETAIL_UNITTYPE: 'GET_CONTENT_DETAIL_UNITTYPE',
        GET_CONTENT_DETAIL_UNITTYPE_PENDING: 'GET_CONTENT_DETAIL_UNITTYPE_PENDING',
        GET_CONTENT_DETAIL_UNITTYPE_FULFILLED: 'GET_CONTENT_DETAIL_UNITTYPE_FULFILLED',
        GET_CONTENT_DETAIL_UNITTYPE_REJECTED: 'GET_CONTENT_DETAIL_UNITTYPE_REJECTED',
        GET_UPDATED_CONTENT_FIELD: 'GET_UPDATED_CONTENT_FIELD',
        POST_CONTENT_DETAIL: 'POST_CONTENT_DETAIL',
        POST_CONTENT_DETAIL_PENDING: 'POST_CONTENT_DETAIL_PENDING',
        POST_CONTENT_DETAIL_FULFILLED: 'POST_CONTENT_DETAIL_FULFILLED',
        POST_CONTENT_DETAIL_REJECTED: 'POST_CONTENT_DETAIL_REJECTED',
        EDITIING_CONTENT: 'EDITIING_CONTENT',
        CREATE_UNIT: 'CREATE_UNIT',
        CREATE_CONTENT: 'CREATE_CONTENT',
        CREATE_CONTENT_PENDING: 'CREATE_CONTENT_PENDING',
        CREATE_CONTENT_FULFILLED: 'CREATE_CONTENT_FULFILLED',
        CREATE_CONTENT_REJECTED: 'CREATE_CONTENT_REJECTED',
        DELETE_CONTENT: 'DELETE_CONTENT',
        DELETE_CONTENT_PENDING: 'DELETE_CONTENT_PENDING',
        DELETE_CONTENT_FULFILLED: 'DELETE_CONTENT_FULFILLED',
        DELETE_CONTENT_REJECTED: 'DELETE_CONTENT_REJECTED',
        TURN_CREATED_TO_DETAIL: 'TURN_CREATED_TO_DETAIL'
    },
    units: {
        GET_UNITS_LIST: 'GET_UNITS_LIST',
        GET_UNITS_LIST_PENDING: 'GET_UNITS_LIST_PENDING',
        GET_UNITS_LIST_FULFILLED: 'GET_UNITS_LIST_FULFILLED',
        GET_UNITS_LIST_REJECTED: 'GET_UNITS_LIST_REJECTED',
        GET_UNITS_DETAIL: 'GET_UNITS_DETAIL',
        GET_UNITS_DETAIL_PENDING: 'GET_UNITS_DETAIL_PENDING',
        GET_UNITS_DETAIL_FULFILLED: 'GET_UNITS_DETAIL_FULFILLED',
        GET_UNITS_DETAIL_REJECTED: 'GET_UNITS_DETAIL_REJECTED',
        GET_UNITS_TEMPLATES: 'GET_UNITS_TEMPLATES',
        GET_UNITS_TEMPLATES_PENDING: 'GET_UNITS_TEMPLATES_PENDING',
        GET_UNITS_TEMPLATES_FULFILLED: 'GET_UNITS_TEMPLATES_FULFILLED',
        GET_UNITS_TEMPLATES_REJECTED: 'GET_UNITS_TEMPLATES_REJECTED',
        GET_UNITS_FIELDS: 'GET_UNITS_FIELDS',
        GET_UNITS_FIELDS_PENDING: 'GET_UNITS_FIELDS_PENDING',
        GET_UNITS_FIELDS_FULFILLED: 'GET_UNITS_FIELDS_FULFILLED',
        GET_UNITS_FIELDS_REJECTED: 'GET_UNITS_FIELDS_REJECTED',
        POST_UNIT_DETAIL: 'POST_UNIT_DETAIL',
        POST_UNIT_DETAIL_PENDING: 'POST_UNIT_DETAIL_PENDING',
        POST_UNIT_DETAIL_FULFILLED: 'POST_UNIT_DETAIL_FULFILLED',
        POST_UNIT_DETAIL_REJECTED: 'POST_UNIT_DETAIL_REJECTED',
        CREATE_UNIT: 'CREATE_UNIT',
        CREATE_UNIT_PENDING: 'CREATE_UNIT_PENDING',
        CREATE_UNIT_FULFILLED: 'CREATE_UNIT_FULFILLED',
        CREATE_UNIT_REJECTED: 'CREATE_UNIT_REJECTED',
        RESET_UNIT_DETAIL: 'RESET_UNIT_DETAIL',
        ADDING_TAB: 'ADDING_TAB',
        ADDING_FIELD: 'ADDING_FIELD',
        UPDATE_UNIT: 'UPDATE_UNIT',
        DELETE_UNIT: 'DELETE_UNIT',
        DELETE_UNIT_PENDING: 'DELETE_UNIT_PENDING',
        DELETE_UNIT_FULFILLED: 'DELETE_UNIT_FULFILLED',
        DELETE_UNIT_REJECTED: 'DELETE_UNIT_REJECTED',
        CLEAR_CONTENT: 'CLEAR_CONTENT'
    },
    bridges: {
        GET_BRIDGES_LIST: 'GET_BRIDGES_LIST',
        GET_BRIDGES_LIST_PENDING: 'GET_BRIDGES_LIST_PENDING',
        GET_BRIDGES_LIST_FULFILLED: 'GET_BRIDGES_LIST_FULFILLED',
        GET_BRIDGES_LIST_REJECTED: 'GET_BRIDGES_LIST_REJECTED',
        GET_BRIDGES_UNITS_LIST: 'GET_BRIDGES_UNITS_LIST',
        GET_BRIDGES_UNITS_LIST_PENDING: 'GET_BRIDGES_UNITS_LIST_PENDING',
        GET_BRIDGES_UNITS_LIST_FULFILLED: 'GET_BRIDGES_UNITS_LIST_FULFILLED',
        GET_BRIDGES_UNITS_LIST_REJECTED: 'GET_BRIDGES_UNITS_LIST_REJECTED',
        GET_BRIDGES_DETAIL: 'GET_BRIDGES_DETAIL',
        GET_BRIDGES_DETAIL_PENDING: 'GET_BRIDGES_DETAIL_PENDING',
        GET_BRIDGES_DETAIL_FULFILLED: 'GET_BRIDGES_DETAIL_FULFILLED',
        GET_BRIDGES_DETAIL_REJECTED: 'GET_BRIDGES_DETAIL_REJECTED',
        POST_BRIDGES_DETAIL: 'POST_BRIDGES_DETAIL',
        POST_BRIDGES_DETAIL_PENDING: 'POST_BRIDGES_DETAIL_PENDING',
        POST_BRIDGES_DETAIL_FULFILLED: 'POST_BRIDGES_DETAIL_FULFILLED' ,
        POST_BRIDGES_DETAIL_REJECTED: 'POST_BRIDGES_DETAIL_REJECTED' ,
        CREATE_BRIDGE: 'CREATE_BRIDGE',
        CREATE_BRIDGE_PENDING: 'CREATE_BRIDGE_PENDING',
        CREATE_BRIDGE_FULFILLED: 'CREATE_BRIDGE_FULFILLED',
        CREATE_BRIDGE_REJECTED: 'CREATE_BRIDGE_REJECTED',
        DELETE_BRIDGE: 'DELETE_BRIDGE',
        DELETE_BRIDGE_PENDING: 'DELETE_BRIDGE_PENDING',
        DELETE_BRIDGE_FULFILLED: 'DELETE_BRIDGE_FULFILLED',
        DELETE_BRIDGE_REJECTED: 'DELETE_BRIDGE_REJECTED'
    },
    unitFields: {
        GET_UNITFIELDS_LIST: 'GET_UNITFIELDS_LIST',
        GET_UNITFIELDS_LIST_PENDING: 'GET_UNITFIELDS_LIST_PENDING',
        GET_UNITFIELDS_LIST_FULFILLED: 'GET_UNITFIELDS_LIST_FULFILLED',
        GET_UNITFIELDS_LIST_REJECTED: 'GET_UNITFIELDS_LIST_REJECTED',
        GET_UNITFIELDS_DETAIL: 'GET_UNITFIELDS_DETAIL',
        GET_UNITFIELDS_DETAIL_PENDING: 'GET_UNITFIELDS_DETAIL_PENDING',
        GET_UNITFIELDS_DETAIL_FULFILLED: 'GET_UNITFIELDS_DETAIL_FULFILLED',
        GET_UNITFIELDS_DETAIL_REJECTED: 'GET_UNITFIELDS_DETAIL_REJECTED'
    },
    user: {
        SAVING_USER: 'SAVING_USER',
        SAVING_USER_PENDING: 'SAVING_USER_PENDING',
        SAVING_USER_FULFILLED: 'SAVING_USER_FULFILLED',
    },
    messages: {
        DELETE_MESSAGE: 'DELETE_MESSAGE'
    },
    translates: {
        GET_TRANSLATES_LIST: 'GET_TRANSLATES_LIST',
        GET_TRANSLATES_LIST_PENDING: 'GET_TRANSLATES_LIST_PENDING',
        GET_TRANSLATES_LIST_FULFILLED: 'GET_TRANSLATES_LIST_FULFILLED',
        GET_TRANSLATES_LIST_REJECTED: 'GET_TRANSLATES_LIST_REJECTED',
        POST_TRANSLATES_LIST: 'POST_TRANSLATES_LIST',
        POST_TRANSLATES_LIST_PENDING: 'POST_TRANSLATES_LIST_PENDING',
        POST_TRANSLATES_LIST_FULFILLED: 'POST_TRANSLATES_LIST_FULFILLED',
        POST_TRANSLATES_LIST_REJECTED: 'POST_TRANSLATES_LIST_REJECTED'
    },
    users: {
        GET_USERS_LIST: 'GET_USERS_LIST',
        GET_USERS_LIST_PENDING: 'GET_USERS_LIST_PENDING',
        GET_USERS_LIST_FULFILLED: 'GET_USERS_LIST_FULFILLED',
        GET_USER_DETAIL: 'GET_USER_DETAIL',
        GET_USER_DETAIL_PENDING: 'GET_USER_DETAIL_PENDING',
        GET_USER_DETAIL_FULFILLED: 'GET_USER_DETAIL_FULFILLED',
        CREATE_USER: 'CREATE_USER',
        CREATE_USER_PENDING: 'CREATE_USER_PENDING',
        CREATE_USER_FULFILLED: 'CREATE_USER_FULFILLED',
        CREATE_USER_REJECTED: 'CREATE_USER_REJECTED',
        DELETE_USER: 'DELETE_USER',
        DELETE_USER_PENDING: 'DELETE_USER_PENDING',
        DELETE_USER_FULFILLED: 'DELETE_USER_FULFILLED',
        DELETE_USER_REJECTED: 'DELETE_USER_REJECTED',
        UPDATE_USER: 'UPDATE_USER',
        UPDATE_USER_PENDING: 'UPDATE_USER_PENDING',
        UPDATE_USER_FULFILLED: 'UPDATE_USER_FULFILLED',
        UPDATE_USER_REJECTED: 'UPDATE_USER_REJECTED',
    },
    auth: {
        LOGIN: 'LOGIN',
        LOGIN_PENDING: 'LOGIN_PENDING',
        LOGIN_FULFILLED: 'LOGIN_FULFILLED',
        LOGOFF: 'LOGOFF',
        GET_LOGGED_USER: 'GET_LOGGED_USER',
        GET_LOGGED_USER_PENDING: 'GET_LOGGED_USER_PENDING',
        GET_LOGGED_USER_FULFILLED: 'GET_LOGGED_USER_FULFILLED',
        CHECK_USERS: 'CHECK_USERS',
        CHECK_USERS_PENDING: 'CHECK_USERS_PENDING',
        CHECK_USERS_FULFILLED: 'CHECK_USERS_FULFILLED',
        GET_INFO: 'GET_INFO',
        GET_INFO_PENDING: 'GET_INFO_PENDING',
        GET_INFO_FULFILLED: 'GET_INFO_FULFILLED',
        CREATE_ADMIN: 'CREATE_ADMIN',
        CREATE_ADMIN_PENDING: 'CREATE_ADMIN_PENDING',
        CREATE_ADMIN_FULFILLED: 'CREATE_ADMIN_FULFILLED'
    },
    profile: {
        UPDATE_PROFILE: 'UPDATE_PROFILE',
        UPDATE_PROFILE_PENDING: 'UPDATE_PROFILE_PENDING',
        UPDATE_PROFILE_FULFILLED: 'UPDATE_PROFILE_FULFILLED',
        UPDATE_PASSWORD: 'UPDATE_PASSWORD',
        UPDATE_PASSWORD_PENDING: 'UPDATE_PASSWORD_PENDING',
        UPDATE_PASSWORD_FULFILLED: 'UPDATE_PASSWORD_FULFILLED'
    },
    media: {
        GET_MEDIA: 'GET_MEDIA',
        GET_MEDIA_PENDING: 'GET_MEDIA_PENDING',
        GET_MEDIA_FULFILLED: 'GET_MEDIA_FULFILLED',
        UPLOAD_MEDIA: 'UPLOAD_MEDIA',
        UPLOAD_MEDIA_PENDING: 'UPLOAD_MEDIA_PENDING',
        UPLOAD_MEDIA_FULFILLED: 'UPLOAD_MEDIA_FULFILLED',
        DELETE_MEDIA: 'DELETE_MEDIA',
        DELETE_MEDIA_PENDING: 'DELETE_MEDIA_PENDING',
        DELETE_MEDIA_FULFILLED: 'DELETE_MEDIA_FULFILLED'
    }
};