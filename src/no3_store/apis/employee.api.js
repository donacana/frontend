import axios from "axios";

const BASE_URL = "http://localhost:3001/employees";


// 전체 직원 조회
export const employeeAllGetApi = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};


// 직원 한 명 조회
export const employeeGetApi = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};


// 직원 등록
export const employeePostApi = async (dataObj) => {
    const response = await axios.post(BASE_URL, dataObj);
    return response.data;
};


// 직원 수정
export const employeePutApi = async (dataObj) => {
    const response = await axios.put(
        `${BASE_URL}/${dataObj.id}`,
        dataObj
    );
    return response.data;
};


// 직원 삭제
export const employeeDeleteApi = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
};