import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    todoAllGetApi,
    todoPostApi,
    todoPutApi,
    todoDeleteApi
} from "../apis/todo.api";


// 전체 할 일 조회
export const useAllGetTodo = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: todoAllGetApi
    });
};


// 할 일 등록
export const usePostTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todoPostApi,

        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (old = []) => [...old, dataObj]
            );
        }
    });
};


// 할 일 수정 및 체크 변경
export const usePutTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todoPutApi,

        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (old = []) =>
                    old.map((item) =>
                        item.id === dataObj.id ? dataObj : item
                    )
            );
        }
    });
};


// 할 일 삭제
export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todoDeleteApi,

        onSuccess: (id) => {
            queryClient.setQueryData(
                ["todos"],
                (old = []) =>
                    old.filter((item) => item.id !== id)
            );
        }
    });
};