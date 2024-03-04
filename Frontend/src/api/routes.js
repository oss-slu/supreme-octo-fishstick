import axios from 'axios';

let BASEURL = process.env.BACKEND_URL;
let BASEURL_PORT = process.env.BACKEND_PORT;

if(!BASEURL){
    BASEURL = "localhost";
}

if(!BASEURL_PORT){
    BASEURL_PORT = 5000;
}

export const getSystems = () => axios({
    method: "get",
    url: `http://${BASEURL}:${BASEURL_PORT}/getAllSystems`,
})

export const getSystem = (label) => axios({
    method: "post",
    url: `http://${BASEURL}:${BASEURL_PORT}/getSystem`,
    data: label
})
    
export const getSelectedSystems = (labels) => axios({
    method: "post",
    url: `http://${BASEURL}:${BASEURL_PORT}/getSelectedSystems`,
    data: labels
})

export const getFilteredSystems = (filters) => axios({
    method: "post",
    url: `http://${BASEURL}:${BASEURL_PORT}/getFilteredSystems`,
    data: filters
})

export const getStatistics = (filters) => axios({
    method: "post",
    url: `http://${BASEURL}:${BASEURL_PORT}/getStatistics`,
    data: filters
})
