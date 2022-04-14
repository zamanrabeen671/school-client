import axios from 'axios';
import { url } from '../BaseURL/BaseURL';
export const createCourse = async (token, config) => {

    try {
        const response = await axios.post(`${url}/course/create`, config, {
            headers: {
                "Authorization": token
            }
        })
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

export const getCourseByTecher = async (token, id) => {
    try {
        const response = await axios.get(`${url}/course/${id}`, {
            headers: {
                "Authorization": token
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllCourses = async (token) => {
    try {
        const response = await axios.get(`${url}/course`, {
            headers: {
                "Authorization": token
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}