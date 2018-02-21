import axios from "axios";

const setHeaders =  () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
	const headers = {
		"Access-Control-Allow-Origin": "*",
		'Accept': 'application/json'
	};

    if (user) {
        headers['Authorization'] =  'Bearer ' + user;
	} 

	return headers;
};

export default axios.create( {
	baseURL: '/api/',
	withCredentials: true,
	headers: setHeaders()
});