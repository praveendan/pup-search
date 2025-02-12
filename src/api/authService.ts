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

  if (res.status === 200) {
    //good stuff
  }
  if (res.status === 400) {
    //bad userName PW
  }
}

export {
  login
}