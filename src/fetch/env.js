import cookie from 'cookie'



const token = cookie.parse(document.cookie).auth

const env = {
    API_BASE_URL : 'http://localhost:8080/',
    expStandard : '/^[A-Za-z0-9]*$/',
    expStrings : '/^[A-Za-z ]*$/',
    expInt : '/^(?:[1-9]\d*|-?)$/',
  
    expFloat : '/^-?\d*(\.\d+)?$/',
    ENV_DEV : 'development',
    ENV_PROD : 'production',
    HEADER: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}
export default env