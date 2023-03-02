const BASE_URL = 'https://jsonplaceholder.typicode.com'

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

async function request<T> (
  url: string,
  method: RequestMethod = 'GET',
  data: any = null // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data)
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

  return await fetch(BASE_URL + url, options)
    .then(async response => {
      if (!response.ok) {
        throw new Error()
      }

      return await response.json()
    })
}

export const client = {
  get: async <T>(url: string) => await request<T>(url),
  post: async <T>(url: string, data: any) => await request<T>(url, 'POST', data),
  patch: async <T>(url: string, data: any) => await request<T>(url, 'PATCH', data),
  delete: async (url: string) => await request(url, 'DELETE')
}
