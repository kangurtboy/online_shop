import StoreService from "./storeService.js";

async function makeApiRequest() {
  try {
    const products = await StoreService.getProducts();
    return products;
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

export { makeApiRequest };