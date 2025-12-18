import axios from 'axios';
import React from 'react';


const axiosInstance = axios.create({
    baseURL: 'https://y-82ojzh3v5-sabbir-ahmeds-projects-243f0503.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;