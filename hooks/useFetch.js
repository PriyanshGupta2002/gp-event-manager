import axios from "axios"
import { useEffect, useState } from "react"

export const useFetch=(url)=>{
    
    const [data, setData] = useState("")
    const [error, setError] = useState("")
    useEffect(() => {

        const fetchData = async()=>{
            try {
                const {data} = await axios.get(`/api/${url}`)
                setData(data)
            } catch (error) {
                setError(error)
            }

        }   
        fetchData()
    }, [url])

    return {
        data,
        error
    }

}