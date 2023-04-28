export default function apiFetch(api) {
    const baseUrl = process.env.REACT_APP_API
    return fetch(baseUrl + api)
}