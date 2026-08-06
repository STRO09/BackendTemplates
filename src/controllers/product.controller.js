import productService from "../services/product.service.js";
import { success } from "../utils/response.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

class ProductController {
  
  create = asyncHandler(async (req, res) => {
    const product = await productService.create(req.body);

    return success(res, {
      statusCode: 201,
      message: "Product created successfully.",
      data: product,
    });
  });

  getAll = asyncHandler(async (req, res) => {
    const products = await productService.getAll();

    return success(res, {
      message: "Products retrieved successfully.",
      data: products,
    });
  });

  getById = asyncHandler(async (req, res) => {
    const product = await productService.getById(req.params.id);

    return success(res, {
      message: "Product retrieved successfully.",
      data: product,
    });
  });
}

export default new ProductController();
