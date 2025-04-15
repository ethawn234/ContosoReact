import { AxiosResponse } from "axios";
import {
  Pizza,
  PizzaCreateDTO,
  PizzaDTO,
  Sauce,
  Topping,
} from "../types/data-contracts";
import apiClient from "./config/axiosConfig";

export const getPizzasAdmin = async (): Promise<AxiosResponse<Pizza[]>> =>
  await apiClient.adminList();

export const getPizzas = async (): Promise<AxiosResponse<PizzaDTO[]>> =>
  await apiClient.contosoPizzaList();

export const getPizza = async (id: number): Promise<AxiosResponse<PizzaDTO>> =>
  await apiClient.contosoPizzaDetail(id);

export const postPizza = async (
  pizza: PizzaCreateDTO,
): Promise<AxiosResponse<PizzaDTO>> =>
  await apiClient.contosoPizzaCreate(pizza);

export const deletePizza = async (id: number): Promise<AxiosResponse> =>
  await apiClient.contosoPizzaDelete(id);

// Toppings & Sauce
export const getToppings = async (): Promise<AxiosResponse<Topping[]>> =>
  await apiClient.getToppings();

export const getSauces = async (): Promise<AxiosResponse<Sauce[]>> =>
  await apiClient.getSauces();
