import getBaseUrl from "./baseURL";

function getImgUrl (name) {
    if (!name) return "";
    
    // If image was uploaded to the server (starts with /uploads or http)
    if (name.startsWith("http://") || name.startsWith("https://")) {
        return name;
    }
    if (name.startsWith("/uploads/")) {
        return `${getBaseUrl()}${name}`;
    }
    if (name.startsWith("uploads/")) {
        return `${getBaseUrl()}/${name}`;
    }
    
    // Default: static bundled assets in frontend/src/assets/books/
    return new URL(`../assets/books/${name}`, import.meta.url).href;
}

export { getImgUrl };