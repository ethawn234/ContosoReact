import apiClient from "./config/axiosConfig";


export const getPizzasAdmin = () => {
    return apiClient.adminList()
}

export const getPizzas = () => {
    const res = apiClient.contosoPizzaList()
    return res;
}