'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io", //   ../../pages/api/socket/io
        addTrailingSlash: false,
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
        },
      }
    );
    // console.log(socketInstance);
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });
    // console.log(socketInstance);
    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });
    // console.log(socketInstance);
    setSocket(socketInstance);
    // console.log(socketInstance);
    return () => {
      // console.log(socketInstance);
      socketInstance.disconnect();
      // console.log(socketInstance);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
