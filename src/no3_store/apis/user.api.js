import axios from "axios";



export const userAllGetApi = async () => {
    try{
        const response = await axios.get("http://localhost:3001/user")
        return response.data
    }catch(error){
        return error 

    }
}

export const userLoginApi = async (userObj) =>{
    try{
        const response = await axios.get(
            `http://localhost:3001/user?username=${userObj.username}`
        )
        
        const users = response.data
       

        return users[0]
    }catch(error){
        return error 
    }
}

export const userRegisterApi = async (userObj) =>{
    try{
        const response = await axios.get(`http://localhost:3001/user?username=${userObj.username}`)
        const users = response.data
        if(users.length>0){
            return Error("이미 존재하는 사용자입니다.")
        }
        return await axios.post(`http://localhost:3001/user`, userObj)
    }catch(error){
        return error 
    }
}
