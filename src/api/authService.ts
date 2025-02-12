import axios from "axios"
import { ENDPOINT } from "../constants"

const login = async (name: string, email:string) => {

  const res = await axios.post(ENDPOINT + '/auth/login', {
    name,
    email
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  console.log(res)
}

export {
  login
}