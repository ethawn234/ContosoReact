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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ContosoPizza API
 * @version v1
 * @license Example License (https://example.com/license)
 * @termsOfService https://example.com/terms
 * @contact Example Contact (https://example.com/contact)
 *
 * An ASP.NET Core Web API for managing Pizza Orders & Promotions
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags ContosoPizza
   * @name GetRoot
   * @request GET:/
   */
  getRoot = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  contosoPizza = {
    /**
     * No description
     *
     * @tags ContosoPizza
     * @name AdminList
     * @request GET:/ContosoPizza/admin
     */
    adminList: (params: RequestParams = {}) =>
      this.request<Pizza[], any>({
        path: `/ContosoPizza/admin`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ContosoPizza
     * @name ContosoPizzaList
     * @summary Fetches all pizzas
     * @request GET:/ContosoPizza
     */
    contosoPizzaList: (params: RequestParams = {}) =>
      this.request<PizzaDTO[], any>({
        path: `/ContosoPizza`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Sample request: POST /ContosoPizza { "id": 0, "name": "Pepperoni Stuffed Crust" }
     *
     * @tags ContosoPizza
     * @name ContosoPizzaCreate
     * @summary Create a new Pizza
     * @request POST:/ContosoPizza
     */
    contosoPizzaCreate: (data: Pizza, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/ContosoPizza`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ContosoPizza
     * @name ContosoPizzaDetail
     * @summary Get a Pizza by Id
     * @request GET:/ContosoPizza/{id}
     */
    contosoPizzaDetail: (id: number, params: RequestParams = {}) =>
      this.request<PizzaDTO, ProblemDetails>({
        path: `/ContosoPizza/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ContosoPizza
     * @name ContosoPizzaDelete
     * @summary Delete a pizza by Id
     * @request DELETE:/ContosoPizza/{id}
     */
    contosoPizzaDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/ContosoPizza/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ContosoPizza
     * @name AddtoppingUpdate
     * @summary Select a topping and add it to your pizza!
     * @request PUT:/ContosoPizza/{pizzaId}/addtopping
     */
    addtoppingUpdate: (
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
      }),

    /**
     * No description
     *
     * @tags ContosoPizza
     * @name UpdatesauceUpdate
     * @summary Select a sauce for your pizza
     * @request PUT:/ContosoPizza/{id}/updatesauce
     */
    updatesauceUpdate: (
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
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags Coupon
     * @name CouponList
     * @summary View the Promotions
     * @request GET:/api/Coupon
     */
    couponList: (params: RequestParams = {}) =>
      this.request<Coupon[], any>({
        path: `/api/Coupon`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
