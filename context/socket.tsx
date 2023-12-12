'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket
}

export const SocketProvider = ({children}: {children: React.ReactNode}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const connection = io();
    setSocket(connection);
  }, []);
  socket?.on('connect_error', async (err): Promise<void> => {
    console.log('error established', err);
    await fetch('/api/socket/io');
  });
  console.log({socket})
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
