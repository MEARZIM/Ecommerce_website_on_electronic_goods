import { useEffect, useState } from "react";

import {fetchDataFromApi} from "../utils/api"

const useFetch =(endpoint) =>{
    const [data, setdata] = useState()

    useEffect ( ()=>{
        const apiCall = async () =>{
            const res =await fetchDataFromApi(endpoint)
            setdata(res)
        }
        apiCall()
    },[endpoint]);

    return {data}
}

export default useFetch