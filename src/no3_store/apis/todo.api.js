import axios from "axios";

const TODO_URL = "http://localhost:3001/todos";


// 전체 할 일 조회
export const todoAllGetApi = async () => {
    const response = await axios.get(TODO_URL);

    return response.data;
};


// 할 일 등록
export const todoPostApi = async (dataObj) => {
    const response = await axios.post(TODO_URL, dataObj);

    return response.data;
};


// 할 일 수정 및 체크 변경
export const todoPutApi = async (dataObj) => {
    const response = await axios.put(
        `${TODO_URL}/${dataObj.id}`,
        dataObj
    );

    return response.data;
};


// 할 일 삭제
export const todoDeleteApi = async (id) => {
    await axios.delete(`${TODO_URL}/${id}`);

    return id;
};