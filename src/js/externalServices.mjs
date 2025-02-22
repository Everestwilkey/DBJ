const baseURL= import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}
export async function getProductsByCategory(category) {
    const response = await
}