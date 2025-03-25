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

export interface Coupon {
  /** @format int32 */
  id?: number;
  description?: string | null;
  /** @format date */
  expiration?: string | null;
}

export interface Pizza {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  sauce?: Sauce;
  toppings?: Topping[] | null;
  secret?: string | null;
}

export interface PizzaDTO {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  sauce?: Sauce;
  toppings?: Topping[] | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface Sauce {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  isVegan?: boolean;
}

export type PizzaCreateBody = {
  id: number;
  name: string;
  sauceId: number;
  toppingIds: number[];  // <-- Correct type definition
}

export interface Topping {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /** @format double */
  calories?: number;
}

export type GetRootData = string;

export type AdminListData = Pizza[];

export type ContosoPizzaListData = PizzaDTO[];

export type ContosoPizzaCreateData = any;

export type ContosoPizzaCreateError = ProblemDetails;

export type ContosoPizzaDetailData = PizzaDTO;

export type ContosoPizzaDetailError = ProblemDetails;

export type ContosoPizzaDeleteData = any;

export type ContosoPizzaDeleteError = ProblemDetails;

export type AddtoppingUpdateData = any;

export type AddtoppingUpdateError = ProblemDetails;

export type UpdatesauceUpdateData = any;

export type UpdatesauceUpdateError = ProblemDetails;

export type CouponListData = Coupon[];
