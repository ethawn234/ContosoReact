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
