import axios from 'axios'

export const createAPI = () => {
  return axios.create({
    baseURL: 'https://gbfs.urbansharing.com/oslobysykkel.no',
    timeout: 5000,
    headers: { 'Client-Identifier': 'noorg-demoapplication' }
  })
}
