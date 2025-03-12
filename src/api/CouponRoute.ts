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

import { CouponListData } from "../types/data-contracts";

export namespace Coupon {
  /**
   * No description
   * @tags Coupon
   * @name CouponList
   * @summary View the Promotions
   * @request GET:/api/Coupon
   */
  export namespace CouponList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CouponListData;
  }
}
