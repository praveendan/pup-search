import axios from "axios"
import { ServiceResponse } from "./types"
import { ENDPOINT, MAX_SEARCH_RES_PER_PAGE, MAX_ZIPS } from "../constants"
import { Region, DogSearch } from "../types/search"

const API_BASE_HEADERS = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const handleErrorRes = (error: any, response: ServiceResponse) => {
  if (axios.isAxiosError(error)) {
    response.resData = error.response
  }
  response.message = error.message
}

/**
 * 
 * @returns a promise that resolves into string array of dog breeds
 */
const getBreeds = async () => {
  interface BreedRes extends ServiceResponse {
    data: string[];
  }
  let response: BreedRes = {
    data: []
  }

  try {
    const res = await axios.get(ENDPOINT + '/dogs/breeds', API_BASE_HEADERS)

    response.data = res.data

  } catch (error: any) {
    handleErrorRes(error, response)
  }
  return response
}

/**
 * 
 * @param northEast lat long of north East corner
 * @param southWest lat long of south West corner
 * @returns a promise that resolves into zipcode array and the number of results
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
    }, API_BASE_HEADERS)
    response.data = {
      results: res.data.results.map((resItem: { zip_code: any }) => resItem.zip_code),
      total: res.data.total
    }

  } catch (error: any) {
    handleErrorRes(error, response)
  }
  return response
}

/**
 * 
 * @param breeds array of breeds
 * @param zipcodes array of zips
 * @param age ab object containing min and max
 * @param sorting object specifying the sort param
 * @returns a promise that resolves into search data
 */
const getDogSearchResults = async (
  breeds: string[],
  zipcodes: string[],
  age: {
    min: string,
    max: string,
  },
  sorting: { key: string; direction: 'asc' | 'desc' } = {
    key: 'breed', direction: 'asc'
  }) => {
  interface DogSearchResultRes extends ServiceResponse {
    data: DogSearch
  }
  let response: DogSearchResultRes = {
    data: {
      results: [],
      next: '',
      back: '',
      total: 0
    }
  }

  try {
    const res = await axios.get(ENDPOINT + '/dogs/search', {
      params: {
        breeds,
        zipcodes,
        ageMin: age.min,
        ageMax: age.max,
        sort: `${sorting.key}:${sorting.direction}`,
        size: MAX_SEARCH_RES_PER_PAGE
      },
      ...API_BASE_HEADERS
    })

    //need to handle 100 dog Id
    const dogDataRes = await axios.post(ENDPOINT + '/dogs', res.data.resultIds as string[], API_BASE_HEADERS)

    response.data = {
      results: dogDataRes.data,
      total: res.data.total
    }

    if (res.data.next) {
      response.data.next = res.data.next
    }

  } catch (error: any) {
    handleErrorRes(error, response)
  }
  return response
}


/**
 * 
 * @param query query string
 * @returns a promise that resolve ino the nest/prev page result
 */
const getOtherPageResults = async (query: string) => {
  interface DogSearchResultRes extends ServiceResponse {
    data: DogSearch
  }
  let response: DogSearchResultRes = {
    data: {
      results: [],
      total: 0
    }
  }

  try {
    const res = await axios.get(ENDPOINT + query, API_BASE_HEADERS)

    const dogDataRes = await axios.post(ENDPOINT + '/dogs', res.data.resultIds as string[], API_BASE_HEADERS)

    response.data = {
      results: dogDataRes.data,
      total: res.data.total
    }

    if (res.data.next) {
      response.data.next = res.data.next
    }

    if (res.data.prev) {
      response.data.back = res.data.prev
    }

  } catch (error: any) {
    handleErrorRes(error, response)
  }
  return response
}


const findMatch = async (dogIds: string[]) => {
  interface DogSearchResultRes extends ServiceResponse {
    data: DogSearch
  }
  let response: DogSearchResultRes = {
    data: {
      results: [],
      total: 0
    }
  }

  try {
    const res = await axios.post(ENDPOINT + '/dogs/match', dogIds, API_BASE_HEADERS)

    const dogDataRes = await axios.post(ENDPOINT + '/dogs', [res.data.match as string], API_BASE_HEADERS)

    response.data = {
      results: dogDataRes.data,
      total: res.data.total
    }

  } catch (error: any) {
    handleErrorRes(error, response)
  }
  return response
}

export {
  findMatch,
  getBreeds,
  getZipcodes,
  getDogSearchResults,
  getOtherPageResults,
}