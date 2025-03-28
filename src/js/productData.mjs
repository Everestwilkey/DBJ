function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
const baseURL = import.meta.env.VITE_SERVER_URL

export async function getData(category) {

  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response)

  return data.Result
}
