import Axios from 'axios'
import router from '@/router'

const instance = Axios.create({
    baseURL: 'http://192.168.1.2:3000/',
    withCredentials: true
})

instance.interceptors.response.use(null, error => {
    switch (error.response.status) {
      case 404:
        router.push({ name: "PageNotFound" })
        break
      case 401:
        if (router.currentRoute.name !== "SignIn") router.push({name: "SignIn"})
        break
    }
    return Promise.reject(error)
  }
)

export default instance