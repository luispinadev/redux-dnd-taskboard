// BACKEND
export const devServerPort = 8080

// MIDDLEWARE API (used by client app)
let apiHost = 'http://localhost:'+devServerPort
if (process.env.NODE_ENV === 'production')
  apiHost = 'https://localhost:8080'

export const API_HOST = `${apiHost}/api`

