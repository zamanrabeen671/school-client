import axios from 'axios';
import { url } from '../BaseURL/BaseURL';

export const enrollMent = async (token, config) => {
    try {
        const response = await axios.post(`${url}/enroll/courseBook`, config, {
            headers: {
                "Authorization": token
            }
        });
        return response.data;
    }
    catch (err) {
        console.log(err)
    }
}

export const getEnrollCours  = async (token, id) =>{
    try{
        const response = await axios.get(`${url}/enroll/courses/${id}`, {
            headers: {
                "Authorization": token
            }
        })
        return response.data;
    }catch(err) {
        console.log(err)
    }
}