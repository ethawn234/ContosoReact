/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  AddtoppingUpdateData,
  AddtoppingUpdateError,
  AdminListData,
  ContosoPizzaCreateData,
  ContosoPizzaCreateError,
  ContosoPizzaDeleteData,
  ContosoPizzaDeleteError,
  ContosoPizzaDetailData,
  ContosoPizzaDetailError,
  ContosoPizzaListData,
  ContosoSaucesListData,
  ContosoToppingsListData,
  GetRootData,
  PizzaCreateDTO,
  UpdatesauceUpdateData,
  UpdatesauceUpdateError,
} from "../types/data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ContosoPizza<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name GetRoot
   * @request GET:/
   */
  getRoot = (params: RequestParams = {}) =>
    this.request<GetRootData, any>({
      path: `/`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name GetRoot
   * @request GET:/
   */
  getRoot = (params: RequestParams = {}) =>
    this.request<GetRootData, any>({
      path: `/`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name AdminList
   * @summary Admin Fetch returns all fields including secret fields
   * @request GET:/ContosoPizza/admin
   */
  adminList = (params: RequestParams = {}) =>
    this.request<AdminListData, any>({
      path: `/ContosoPizza/admin`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name ContosoPizzaList
   * @summary Fetches all pizzas
   * @request GET:/ContosoPizza
   */
  contosoPizzaList = (params: RequestParams = {}) =>
    this.request<ContosoPizzaListData, any>({
      path: `/ContosoPizza`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Sample request: ``` POST /ContosoPizza { "id": 0, "name": "Pepperoni Stuffed Crust" } ```
   *
   * @tags ContosoPizza
   * @name ContosoPizzaCreate
   * @summary Create a new Pizza
   * @request POST:/ContosoPizza
   */
  contosoPizzaCreate = (data: PizzaCreateDTO, params: RequestParams = {}) =>
    this.request<ContosoPizzaCreateData, ContosoPizzaCreateError>({
      path: `/ContosoPizza`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name ContosoPizzaDetail
   * @summary Get a Pizza by Id
   * @request GET:/ContosoPizza/{id}
   */
  contosoPizzaDetail = (id: number, params: RequestParams = {}) =>
    this.request<ContosoPizzaDetailData, ContosoPizzaDetailError>({
      path: `/ContosoPizza/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name ContosoPizzaDelete
   * @summary Delete a pizza by Id
   * @request DELETE:/ContosoPizza/{id}
   */
  contosoPizzaDelete = (id: number, params: RequestParams = {}) =>
    this.request<ContosoPizzaDeleteData, ContosoPizzaDeleteError>({
      path: `/ContosoPizza/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name AddtoppingUpdate
   * @summary Select a topping and add it to your pizza!
   * @request PUT:/ContosoPizza/{pizzaId}/addtopping
   */
  addtoppingUpdate = (
    pizzaId: number,
    query?: {
      /** @format int32 */
      toppingId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<AddtoppingUpdateData, AddtoppingUpdateError>({
      path: `/ContosoPizza/${pizzaId}/addtopping`,
      method: "PUT",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name getToppings
   * @summary Select a topping and add it to your pizza!
   * @request GET:/api/topping
   */
  getToppings = (params: RequestParams = {}) =>
    this.request<ContosoToppingsListData, any>({
      path: `/api/topping`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name getToppings
   * @summary Select a topping and add it to your pizza!
   * @request GET:/api/topping
   */
  getSauces = (params: RequestParams = {}) =>
    this.request<ContosoSaucesListData, any>({
      path: `/api/sauces`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name UpdatesauceUpdate
   * @summary Select a sauce for your pizza
   * @request PUT:/ContosoPizza/{id}/updatesauce
   */
  updatesauceUpdate = (
    id: number,
    query?: {
      /** @format int32 */
      sauceId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<UpdatesauceUpdateData, UpdatesauceUpdateError>({
      path: `/ContosoPizza/${id}/updatesauce`,
      method: "PUT",
      query: query,
      ...params,
    });
}
