import { AxiosResponse } from "axios";
import { Pizza, PizzaDTO } from "../types/data-contracts";
import apiClient from "./config/axiosConfig";

export const getPizzasAdmin = async (): Promise<AxiosResponse<Pizza[]>> => await apiClient.adminList();

export const getPizzas = async (): Promise<AxiosResponse<PizzaDTO[]>> => await apiClient.contosoPizzaList();

export const getPizza = async (id: number): Promise<AxiosResponse<PizzaDTO>> => await apiClient.contosoPizzaDetail(id);

export const postPizza = async (pizza: PizzaDTO) => await apiClient.contosoPizzaCreate(pizza);

export const deletePizza = async (id: number) => await apiClient.contosoPizzaDelete(id);

// export const  = async (pizza: PizzaDTO) => await apiClient.