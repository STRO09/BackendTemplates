import repositories from "../db/provider.js";
import ApiError from "../utils/ApiError.js";

const { product: productRepository } = repositories;

class ProductService {

    async create(productData) {

        const existing = await productRepository.findByName(productData.name);

        if (existing) {
            throw new ApiError({
                statusCode: 409,
                message: "A product with this name already exists."
            });
        }

        return productRepository.create(productData);

    }

    async getAll() {
        return productRepository.findAll();
    }

    async getById(id) {

        const product = await productRepository.findById(id);

        if (!product) {
            throw new ApiError({
                statusCode: 404,
                message: "Product not found."
            });
        }

        return product;

    }

}

export default ProductService;