import axios from 'axios';

const axiosInstance = axios.create();

// Set up CSRF token inclusion
axiosInstance.defaults.xsrfCookieName = 'csrftoken';      // Change to your CSRF cookie name
axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken';   // Keep this as 'X-CSRFToken'

export default axiosInstance;