"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const url =
    process.env.NODE_ENV === "production"
      ? "https://google-meet-clone-socket.onrender.com"
      : "http://localhost:5334/";
  console.log({ url });
  useEffect(() => {
    const connection = io(url);
    setSocket(connection);
  }, [url]);
  socket?.on("connect_error", async (err): Promise<void> => {
    console.log("error established", err);
    await fetch(url);
  });
  console.log({ socket });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
