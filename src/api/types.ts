import { AxiosResponse } from "axios";

interface ServiceResponse {
  message?: string;
  resData?: AxiosResponse<any, any>;
  data?: any;
}

export type {
  ServiceResponse
}