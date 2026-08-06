/**
 * Repository provider.
 *
 * Selects the appropriate repository implementations based on
 * the configured database driver.
 *
 * Services import repositories from this module rather than
 * importing database-specific implementations directly.
 *
 * This allows the application's persistence layer to be swapped
 * (MongoDB, PostgreSQL, MySQL, etc.) without affecting business logic.
 */

import env from "../config/env.js";

import productMongoRepository from "./mongoose/repositories/product.repository.js";

/**
 * Repository registry.
 *
 * @type {{
 * product?: import("./repository.interface.js").default
 * }}
 */
const repositories = {};

switch (env.DB_DRIVER) {
  case "mongo":
    repositories.product = productMongoRepository;
    break;

  default:
    throw new Error(`Unsupported database driver: ${env.DB_DRIVER}`);
}

export default repositories;
