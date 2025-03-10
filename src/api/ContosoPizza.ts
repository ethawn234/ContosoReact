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

import { Pizza, PizzaDTO, ProblemDetails } from "../types/data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ContosoPizza<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name AdminList
   * @request GET:/ContosoPizza/admin
   */
  adminList = (params: RequestParams = {}) =>
    this.request<Pizza[], any>({
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
    this.request<PizzaDTO[], any>({
      path: `/ContosoPizza`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Sample request: POST /ContosoPizza { "id": 0, "name": "Pepperoni Stuffed Crust" }
   *
   * @tags ContosoPizza
   * @name ContosoPizzaCreate
   * @summary Create a new Pizza
   * @request POST:/ContosoPizza
   */
  contosoPizzaCreate = (data: Pizza, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
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
    this.request<PizzaDTO, ProblemDetails>({
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
    this.request<void, ProblemDetails>({
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
    this.request<void, ProblemDetails>({
      path: `/ContosoPizza/${pizzaId}/addtopping`,
      method: "PUT",
      query: query,
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
    this.request<void, ProblemDetails>({
      path: `/ContosoPizza/${id}/updatesauce`,
      method: "PUT",
      query: query,
      ...params,
    });
}
