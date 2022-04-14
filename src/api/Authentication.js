import axios from 'axios';
import { url } from '../BaseURL/BaseURL';
export const getAutheToken = async (config) => {
    try {
        const response = await axios.post(`${url}/auth/token`, config)
        console.log(response);
    } catch (err) {
        console.log(err)
    }
}
export const getRegister = async (config) => {
    try {
        const response = await axios.post(`${url}/auth/register`, config)
        return response.data;
    } catch (err) {
        console.log(err)
    }
}
export const getLogin = async (config) => {
    try {
        const response = await axios.post(`${url}/auth/login`, config)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export const getAllUsers = async (token) => {
    try {
        const response = await axios.get(`${url}/auth/allUser`, {
            headers: {
                headers: {
                    "Authorization": token
                }
            }
        })
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}
export const getUserById = async (token, id) => {
    try {
        const response = await axios.get(`${url}/auth/user/${id}`, {
            headers: {
                'Authorization': token
            }
        })
        return response.data;
    } catch (err) {

    }
}

export const deleteUser = async(token, id ) => {
    try{
        const response = await axios.delete(`${url}/auth/banuser/${id}`, {
            headers: {
                'Authorization': token
            }
        }) 
        return response.data;
    }catch(err) {
        console.log(err)
    }
}

export const profileUpdate = async(token, config) => {
    try{
        const response  = await axios.patch(`${url}/auth/update-user`, config, {
            headers: {
                'Authorization': token
            }
        })
        return response.data;
    }catch(err) {
        console.log(err)
    }
}