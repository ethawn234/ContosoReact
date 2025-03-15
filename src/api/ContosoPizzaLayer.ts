import { AxiosResponse } from "axios";
import { PizzaDTO } from "../types/data-contracts";
import apiClient from "./config/axiosConfig";

export const getPizzasAdmin = () => {
    return apiClient.adminList()
}

export const getPizzas = async (): Promise<AxiosResponse<PizzaDTO[]>> => {
    return await apiClient.contosoPizzaList();
}

export const getPizza = async (id: number) => {
    return await apiClient.contosoPizzaDetail(id);
}