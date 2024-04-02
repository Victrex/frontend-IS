// const token = cookie.parse(document.cookie).auth
// const {token: tokenFromAuth} = useAuthStore()
const tokenFromAuth = localStorage.getItem('auth')

// console.log(JSON.parse(tokenFromAuth).state.token)
const env = {
    URL_BACKEND : 'http://localhost:8080/',
    API_BASE_URL : 'http://localhost:8080/',
    expStandard : '/^[A-Za-z0-9]*$/',
    expStrings : '/^[A-Za-z ]*$/',
    expInt : '/^(?:[1-9]\d*|-?)$/',
    ENV_MIN_DATE : '2022-01-01',
    expFloat : '/^-?\d*(.\d+)?$/',
    ENV_DEV : 'development',
    ENV_PROD : 'production',
    HEADER: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${JSON.parse(tokenFromAuth).state.token}`
    }
}
export default env