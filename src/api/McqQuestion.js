/* eslint-disable no-unused-vars */
import axios from 'axios';
import { url } from '../BaseURL/BaseURL';

export const createMCQQuestion = async (token, config) => {

    try {
        const response = await axios.post(`${url}/mcq/addQuestion`, config, {
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

export const getAllMcqQuestion = async (token) => {
    try {
        const resposne = await axios.get(`${url}/mcq/getAllMcq`, {
            headers: {
                "Authorization": token
            }
        })
        return resposne.data;
    }
    catch (err) {
        console.log(err)
    }
}

export const getMCQBYTeacher = async (token, id) => {
    try{
        const response = await axios.get(`${url}/mcq/teacherQuestion/${id}`, {
            headers: {
                "Authorization": token
            }
        })
        return response.data
    }
    catch(err) {
        console.log(err)
    }
}