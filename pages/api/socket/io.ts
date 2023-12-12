import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("socket already running");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket): void => {
      console.log("socket server connected");
      socket?.on("join_room", (roomId, id) => {
        console.log("a new user with user id joined room", { roomId, id });
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user_connected", id);
      });
      socket.on("user_toggle_audio", (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user_toggle_audio", userId);
      });
      socket.on("user_toggle_video", (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user_toggle_video", userId);
      });
      socket.on("user_leave", (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user_leave", userId);
      });
    });
  }
  res.end();
};
export default SocketHandler;
