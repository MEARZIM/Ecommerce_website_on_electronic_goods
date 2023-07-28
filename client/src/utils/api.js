import axios from "axios"

const params = {
    headers:{
        Authorization: "Bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
        "Content-Type": "application/json"
    }
}

export const fetchDataFromApi = async(url) =>{
    try {
        const {data} = await axios.get(process.env.REACT_APP_DEV_URL + url , params)
        // console.log(data)
        return data
    } catch (error) {
        // console.log(error)
        return error
    }
}
export const fetchEmailAndNumberFromApi = async(url) =>{
    try {
        const data = await axios.get(process.env.REACT_APP_DEV_URL + url , params)
        // console.log(data)
        return data
    } catch (error) {
        // console.log(error)
        return error
    }
}

export const sendDataFormApi = async (url,data) =>{
 try {
     const res = await axios.post(process.env.REACT_APP_DEV_URL + url, data, params)
    //  console.log(res.status)    
     return res.status  

 } catch (error) {
    return error
 }
}

export const updateDataFormApi = async (url,updatedData) =>{
    try {
        const res = await axios.put(process.env.REACT_APP_DEV_URL + url, updatedData, params);
       return (res)
       
    } catch (error) {
       console.log(error)
       return error
    }
   }

export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    headers:{
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY
    }
})