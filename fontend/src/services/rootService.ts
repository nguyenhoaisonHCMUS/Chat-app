import { store } from '@/redux/store';
import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:8000/api/v1`,
    timeout: 5000,
})

//config headers
instance.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().auth.currentUser.accessToken;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const sendMess = async (message: string, receivedId: string) => {
  try {
    const res = await instance.post(`/send-message/${receivedId}`,{message})
    return res.data;
    
  } catch (error) {
    console.log('error:',error);
  }
}

export const getConversations = async () => {
  try {
    const res = await instance.post(`//users`)
    return res.data;
    
  } catch (error) {
    console.log('error:',error);
  }
}


