import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mcburgerbuilder.firebaseio.com/',
});

export default instance;
