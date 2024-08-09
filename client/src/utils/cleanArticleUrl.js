export function cleanURL(title) {
    return title?.trim().replaceAll(" ", "-")
}