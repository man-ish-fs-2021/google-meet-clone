"use client";
import { useSocket } from "@/context";
import { useParams, useRouter } from "next/navigation";
import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";

const usePeer = () => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const params = useParams<{ roomId: string }>();
  const socket = useSocket();
  const [id, setId] = useState<string | null>(null);
  const isPeerSet = useRef(false);
  useEffect(() => {
    if (!params?.roomId || !socket) return;
    if (isPeerSet.current) return;
    const isDev = process.env.NODE_ENV !== "production";
    const url = !isDev ? "google-meet-peer.onrender.com" : "localhost";
    (async () => {
      const myPeer = new Peer({
        host: url,
        secure: isDev ? false : true,
        port: isDev ? 5050 : 443,
        path: "/",
      });
      setPeer(myPeer);
      myPeer.on("open", (id): void => {
        setId(id);
        console.log("Peer js initialized", id);
        // emitting room id (from uuid) and peer id(from peer)
        socket?.emit("join_room", params.roomId, id);
      });
    })();
    isPeerSet.current = true;
  }, [socket, params]);
  return { peer, id };
};

export default usePeer;
