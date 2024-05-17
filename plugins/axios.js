import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:5118/api/',
  })

  nuxtApp.provide('axios', api)
})
