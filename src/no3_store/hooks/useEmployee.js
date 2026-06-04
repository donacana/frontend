import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    employeeAllGetApi,
    employeePostApi,
    employeePutApi,
    employeeDeleteApi,
    employeeGetApi
} from "../apis/employee.api";


// 전체 직원 조회
export const useAllGetEmployee = () => {
    return useQuery({
        queryKey: ["employees"],
        queryFn: employeeAllGetApi
    });
};


// 직원 한 명 조회
export const useGetEmployee = (id) => {
    return useQuery({
        queryKey: ["employees", id],
        queryFn: () => employeeGetApi(id),
        enabled: !!id
    });
};


// 직원 등록
export const usePostRegisterEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeePostApi,

        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["emsployees"],
                (old = []) => [...old, dataObj]
            );
        }
    });
};


// 직원 수정
export const usePutUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeePutApi,

        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["employees"],
                (old = []) =>
                    old.map((item) =>
                        item.id === dataObj.id ? dataObj : item
                    )
            );

            queryClient.setQueryData(
                ["employees", dataObj.id],
                dataObj
            );
        }
    });
};


// 직원 삭제
export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeDeleteApi,

        onSuccess: (id) => {
            queryClient.setQueryData(
                ["employees"],
                (old = []) =>
                    old.filter((item) => item.id !== id)
            );

            queryClient.removeQueries({
                queryKey: ["employees", id]
            });
        }
    });
};