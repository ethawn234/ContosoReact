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
  AdminListData,
  ContosoPizzaCreateData,
  ContosoPizzaDeleteData,
  ContosoPizzaDetailData,
  ContosoPizzaListData,
  GetRootData,
  Pizza,
  UpdatesauceUpdateData,
} from "../types/data-contracts";

export namespace ContosoPizza {
  /**
   * No description
   * @tags ContosoPizza
   * @name GetRoot
   * @request GET:/
   */
  export namespace GetRoot {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRootData;
  }

  /**
   * No description
   * @tags ContosoPizza
   * @name AdminList
   * @summary Admin Fetch returns all fields including secret fields
   * @request GET:/ContosoPizza/admin
   */
  export namespace AdminList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListData;
  }

  /**
   * No description
   * @tags ContosoPizza
   * @name ContosoPizzaList
   * @summary Fetches all pizzas
   * @request GET:/ContosoPizza
   */
  export namespace ContosoPizzaList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ContosoPizzaListData;
  }

  /**
   * @description Sample request: ``` POST /ContosoPizza { "id": 0, "name": "Pepperoni Stuffed Crust" } ```
   * @tags ContosoPizza
   * @name ContosoPizzaCreate
   * @summary Create a new Pizza
   * @request POST:/ContosoPizza
   */
  export namespace ContosoPizzaCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Pizza;
    export type RequestHeaders = {};
    export type ResponseBody = ContosoPizzaCreateData;
  }

  /**
   * No description
   * @tags ContosoPizza
   * @name ContosoPizzaDetail
   * @summary Get a Pizza by Id
   * @request GET:/ContosoPizza/{id}
   */
  export namespace ContosoPizzaDetail {
    export type RequestParams = {
      /** @format int32 */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ContosoPizzaDetailData;
  }

  /**
   * No description
   * @tags ContosoPizza
   * @name ContosoPizzaDelete
   * @summary Delete a pizza by Id
   * @request DELETE:/ContosoPizza/{id}
   */
  export namespace ContosoPizzaDelete {
    export type RequestParams = {
      /** @format int32 */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ContosoPizzaDeleteData;
  }

  /**
   * No description
   * @tags ContosoPizza
   * @name AddtoppingUpdate
   * @summary Select a topping and add it to your pizza!
   * @request PUT:/ContosoPizza/{pizzaId}/addtopping
   */
  export namespace AddtoppingUpdate {
    export type RequestParams = {
      /** @format int32 */
      pizzaId: number;
    };
    export type RequestQuery = {
      /** @format int32 */
      toppingId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AddtoppingUpdateData;
  }

  /**
   * No description
   * @tags ContosoPizza
   * @name UpdatesauceUpdate
   * @summary Select a sauce for your pizza
   * @request PUT:/ContosoPizza/{id}/updatesauce
   */
  export namespace UpdatesauceUpdate {
    export type RequestParams = {
      /** @format int32 */
      id: number;
    };
    export type RequestQuery = {
      /** @format int32 */
      sauceId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UpdatesauceUpdateData;
  }
}
