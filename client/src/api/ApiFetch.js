export default function apiFetch(api, method = null) {
    const baseUrl = process.env.REACT_APP_API
    if (!method) {
        method = {method: "GET"}
    }
    method.credentials = 'include'
    return fetch(baseUrl + api, method)
}