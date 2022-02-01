

/**
 * @param {RequestInfo} url
 * @param params
 * @return {Promise<Object>}
 */
 export async function jsonFetch (url, params = {}) {
   
  params = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    ...params
  }

    // Si on reçoit un objet on le convertit en chaine JSON
    if (params.body && typeof params.body === 'object') {
      params.headers = {
        ...params.headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
      params.body = JSON.stringify(params.body)
    }
  
    const response = await fetch(url, params)


    if (response.status === 204) {
      return null
    }
    const data = await response.json()
    if (response.ok) {
      return data
    }
    throw new ApiError(response, data)
  }

  export class ApiError {
    constructor (response, data) {
      this.response = response
      this.data = data
    }
  }