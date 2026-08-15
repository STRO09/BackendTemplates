import socketProvider from "./providers/provider.js";

export function initializeSockets(server) {
  socketProvider.initialize(server);
}
