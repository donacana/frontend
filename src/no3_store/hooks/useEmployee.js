import { useQuery, useMutation, useQueryClient, useQueryClient } from "@tanstack/react-query";

import {
    employeeAllGetApi,
    employeePostApi,
    employeePutApi,
    employeeDeleteApi
} from "../apis/employee.api"

export const useAllGetEmployee = () => {
    return useQuery({
        queryKey: ["employees"],
        queryFn: employeeAllGetApi
    })
}

export const usePostRegisterEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePostApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueriesData(
                ["employees"],
                (oldData=[]) =>[
                    ...oldData, dataObj
                ]
            )
        }
    })
}

export const usePutUpdateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeePutApi,
        onSuccess: (dataObj) =>{
            queryClient.setQueriesData(
                ["employees"],
                (oldData=[]) => oldData.map(item =>
                item.id === dataObj.id ?
                dataObj : item
                )
            );
            queryClient.setQueriesData(
                ["employees", dataObj.id],
                employeePutApi
            )
        }
    })
}

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeDeleteApi,
        onSuccess: (id) =>{
            queryClient.setQueriesData(
                ["employees"],
                (oldData=[]) => oldData.filter(item =>
                    item.id !== id
                )
            );
            queryClient.setQueriesData(
                ["employees", id]
            )
        }
    })
}