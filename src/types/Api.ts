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

import { Coupon } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Coupon
   * @name CouponList
   * @summary View the Promotions
   * @request GET:/api/Coupon
   */
  couponList = (params: RequestParams = {}) =>
    this.request<Coupon[], any>({
      path: `/api/Coupon`,
      method: "GET",
      format: "json",
      ...params,
    });
}
