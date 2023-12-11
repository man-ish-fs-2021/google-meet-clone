import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("socket already running");
  } else {
    const io = new Server(res.socket.server, {
      /* options */
    });
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      console.log("socket server connected");
    });
  }
  res.end();
};
export default SocketHandler;
