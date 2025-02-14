import axios from "axios"
import { ServiceResponse } from "./types"
import { ENDPOINT } from "../constants"
import { Region } from "../types/search"

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

const getZipcodes = async (northEast: Region, southWest: Region ) => {
  interface BreedRes extends ServiceResponse {
    data: string[]
  }
  let response: BreedRes = {
    data: []
  }

  try {
    const res = await axios.post(ENDPOINT + '/locations/search', {
      geoBoundingBox: {
        bottom_left: {
          lat: southWest.lat,
          lon: southWest.lng
        },
        top_right: {
          lat: northEast.lat,
          lon: northEast.lng
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    console.log(res)
    //response.data = res.data

  } catch (error: any) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      //esponse.resData = error.response
    }
    //response.message = error.message
  }
  return response
}

export {
  getBreeds,
  getZipcodes
}