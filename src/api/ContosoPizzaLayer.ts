import apiClient from "./config/axiosConfig";

export const getPizzasAdmin = () => {
    return apiClient.adminList()
}

export const getPizzas = async () => {
    return await apiClient.contosoPizzaList();
}

export const getPizza = async (id: number) => {
    return await apiClient.contosoPizzaDetail(id);
}