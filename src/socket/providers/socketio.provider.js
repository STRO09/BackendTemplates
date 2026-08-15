import { Server } from "socket.io";

import SocketProvider from "./provider.interface.js";

class SocketIOProvider extends SocketProvider {
  constructor() {
    super();

    this.io = null;
  }

  initialize(server) {
    this.io = new Server(server);
  }

  emit(event, payload) {
    this.io.emit(event, payload);
  }

  emitToRoom(room, event, payload) {
    this.io.to(room).emit(event, payload);
  }
}

export default new SocketIOProvider();
