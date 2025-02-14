import axios from "axios";
import { ServiceResponse } from "./types";
import { API_BASE_HEADERS, ENDPOINT } from "../appSettings";

const login = async (name: string, email: string) => {
  let response: ServiceResponse = { }

  try {
    const res = await axios.post(ENDPOINT + '/auth/login', {
      name,
      email
    }, API_BASE_HEADERS)
    response.resData = res

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      response.resData = error.response
    }
    response.message = error.message
  }
  return response
}

const logout = async () => {
  let response: ServiceResponse = {}

  try {
    const res = await axios.post(ENDPOINT + '/auth/logout', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    response.resData = res

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      response.resData = error.response
    }
    response.message = error.message
  }
  return response
}

export {
  login,
  logout
}