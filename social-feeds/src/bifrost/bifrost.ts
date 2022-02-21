import axios from 'axios';
import config from '../config/app.config.json';

export default axios.create({baseURL: config.baseURL});
