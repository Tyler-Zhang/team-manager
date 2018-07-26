import axios from 'axios';


/**
 * Create our instance of axios which will, by default
 * set and send cookies when communicating to the server
 */
export default axios.create({
  withCredentials: true
});
