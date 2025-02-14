import axios from "axios"
import { ServiceResponse } from "./types"
import { ENDPOINT, MAX_ZIPS } from "../constants"
import { Region } from "../types/search"

const handleErrorRes = (error: any, response: ServiceResponse) => {
  if (axios.isAxiosError(error)) {
    response.resData = error.response
  }
  response.message = error.message
}

/**
 * 
 * @returns a string array of dog breeds
 */
const getBreeds = async () => {
  interface BreedRes extends ServiceResponse {
    data: string[];
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

/**
 * 
 * @param northEast lat long of north East corner
 * @param southWest lat long of south West corner
 * @returns 
 */
const getZipcodes = async (northEast: Region, southWest: Region ) => {
  interface ZipCodeRes extends ServiceResponse {
    data: {
      results: string[],
      total: number;
    }
  }
  let response: ZipCodeRes = {
    data: {
      results: [],
      total: 0
    }
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
      },
      size: MAX_ZIPS
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    response.data = {
      results: res.data.results.map((resItem: { zip_code: any }) => resItem.zip_code),
      total: res.data.total
    }

  } catch (error: any) {
    handleErrorRes(error, response)
  }
  return response
}

export {
  getBreeds,
  getZipcodes
}