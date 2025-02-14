import axios from "axios"
import { ServiceResponse } from "./types"
import { ENDPOINT } from "../constants"

const getBreeds = async () => {
  interface BreedRes extends ServiceResponse {
    data: string[]
  }
  let response: BreedRes = {
    data: []
  }

  try {
    const res = await axios.get(ENDPOINT + '/dogs/breeds', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    console.log(res)
    response.data = res.data

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      response.resData = error.response
    }
    response.message = error.message
  }
  return response
}


export {
  getBreeds
}