import axios from "axios"
import { useEffect } from "react"
import { useConfig } from "../context/ConfigContext";

export default function Products(){
    const { apiUrl } = useConfig();

    async function getProducts(){
        try{
            const response = await axios.get(`${apiUrl}/api/products`)
            
        }
        catch (error){

        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (

        <>
        
        
        </>
    )
}