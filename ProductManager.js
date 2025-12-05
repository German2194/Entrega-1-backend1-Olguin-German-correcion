import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id == id);
  }

  async addProduct(product) {
    const products = await this.getProducts();
    product.id = Date.now();
    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async updateProduct(id, data) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id == id);
    products[index] = { ...products[index], ...data, id: products[index].id };
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id != id);
    await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));
  }
}
