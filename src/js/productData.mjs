function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  // Fetch all product data
  const products = await getData();
  // Find the product by its ID
  const product = products.find((item) => item.Id === id);
  // If the product does not exist, throw an error to handle it properly
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  // Return the product if found
  return product;
}
