import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: `http://localhost:8000/api/v1`,
    timeout: 7000,
})


export const signin = async (username: string, password: string) => {
    try {
        const res = await instance.post('/signin', {username, password});
        return res.data;
    } catch (error) {
        console.log('error of Login f:',error );
    }
}

export const singup = async (fullname: string, gender: string, username: string, password: string) => {
    try {
        const res = await instance.post(
            '/signup',
            {fullname, gender, username, password}
        );
        return res.data;
    } catch (error) {
        console.log('error of Login f:',error );
    }
}
