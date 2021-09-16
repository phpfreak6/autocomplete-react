export async function getSearchResult(searchUrl, searchItem) {
    try {
        let result = await fetch(searchUrl + searchItem)
        return result.json();
    } catch (error) {
        throw error.toString();
    };

}