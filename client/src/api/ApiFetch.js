export default function apiFetch(api, method = null) {
    const baseUrl = process.env.REACT_APP_API
    if (method)
       return fetch(baseUrl + api, method)
    else {
        return fetch(baseUrl + api)
    }
}