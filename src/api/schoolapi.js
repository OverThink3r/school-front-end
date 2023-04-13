import axios from "axios";

const schoolapi = axios.create({
  baseURL: 'http://localhost:8080/'
})

export {
  schoolapi
}
