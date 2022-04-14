import axios from 'axios';
import { url } from '../BaseURL/BaseURL';
export const attendExam = async (token, config) => {
    try {
        const response = await axios.post(`${url}/exam/attend`, config, {
            headers: {
                "Authorization": token
            }
        });
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

export const getParticipendMCQ = async (token, id) => {
    try {
        const response = await axios.get(`${url}/exam/participend/${id}`, {
            headers: {
                "Authorization": token
            }
        })
        return response.data;
    }
    catch (err) {
        console.log(err)
    }
}