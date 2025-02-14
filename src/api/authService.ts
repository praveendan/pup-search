import axios, { AxiosResponse } from "axios";
import { ENDPOINT } from "../constants";

interface ServiceResponse {
  message?: string;
  data?: AxiosResponse<any, any>;
}

const login = async (name: string, email: string) => {
  let response: ServiceResponse = { }

  try {
    const res = await axios.post(ENDPOINT + '/auth/login', {
      name,
      email
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      // withCredentials: true
    })
    response.data = res

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.status === 400) {
        response.data = error.response
      }
    }
    response.message = error.message
  }
  return response
}

export {
  login
}