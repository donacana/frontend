import axios from "axios";



export const userTotalGetApi = async () => {
    try{
        const response = await axios.get("http://localhost:3001/user")
        return response.data
    }catch(error){
        return error 

    }
}

export const userGetApi = async () => {
    try{
        const response = await axios.get(`http://localhost:3001/user/${id}`) // 이게 하나만 받는 방법
        return response.data
    }catch(error){
        return error 

    }
}


export const userPostApi = async (dataObj) => {
    try{
        const response = await axios.post("http://localhost:3001/user",dateObj) 
        return response.data
    }catch(error){
        return error 

    }
}

export const userPutApi = async (dataObj) => {
    try{
        const response = await axios.put(`http://localhost:3001/user/2`,dateObj) //put방식
        return response.data
    }catch(error){
        return error 

    }
}

export const userDeleteApi = async (dataObj) => {
    try{
        const response = await axios.delete(`http://localhost:3001/user/${id}`)
        return response.data
    }catch(error){
        return error 

    }
}