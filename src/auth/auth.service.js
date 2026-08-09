import passwordProvider from "./providers/password.provider.js";
import authStrategy from "./provider.js";
import repositories from "../db/provider.js";
import { hash } from "../utils/hashing.js";
import { generateFromEmail } from "../utils/usernameGenerator.js";
import { serializeUser } from "../utils/userSerializer.js";
const { user: userRepository } = repositories;

import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

class AuthService {

  async register({ 
    // firstName, lastName, 
    email, password }) {
    logger.info("User registration attempt", {
      email,
    });

    const emailExists = await userRepository.existsByEmail(email);

    if (emailExists) {
      throw new ApiError({
        statusCode: 409,
        message: "Email is already registered.",
      });
    }

    // let username;

    // for (let attempt = 0; attempt < 5; attempt++) {
    //   const candidate = generateFromEmail(email);

    //   const usernameExists = await userRepository.existsByUsername(candidate);

    //   if (!usernameExists) {
    //     username = candidate;
    //     break;
    //   }
    // }

    // if (!username) {
    //   throw new ApiError({
    //     statusCode: 500,
    //     message: "Unable to generate a unique username.",
    //   });
    // }

    const passwordHash = await hash(password);

    const user = await userRepository.create({
    //   firstName,
    //   lastName,
      email: email.toLowerCase(),
    //   username,
      passwordHash,
    });

    logger.success("User registered", {
      userId: user._id.toString(),
    });

    return serializeUser(user);
  }

  async login({ email, password }) {
    logger.info("Authentication attempt", {
      email,
    });

    const user = await passwordProvider.authenticate({
      email,
      password,
    });

    const credentials = await authStrategy.issue(user);

    logger.success("User authenticated", {
      userId: user._id.toString(),
    });

    return {
      user: serializeUser(user),
      ...credentials,
    };
  }
}

export default new AuthService();
