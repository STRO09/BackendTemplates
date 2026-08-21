import MongoRepository from "./mongoRepository.js";

import Order from "../models/order.model.js";

class OrderRepository extends MongoRepository {
  constructor() {
    super(Order);
  }

  async findByUser(userId) {
    return this.model.find({ user: userId }).sort({ createdAt: -1 });
  }
}

export default new OrderRepository();
