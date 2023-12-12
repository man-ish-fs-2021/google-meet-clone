"use client";
import { useSocket } from "@/context";
import { useParams, useRouter } from "next/navigation";
import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";

const usePeer = () => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const params = useParams<{roomId: string}>();
  const socket = useSocket();
  const [id, setId] = useState<string | null>(null);
  const isPeerSet = useRef(false);
  useEffect(() => {
    if (!params?.roomId || !socket) return;
    if (isPeerSet.current) return;
    (async () => {
      const myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);
      myPeer.on("open", (id): void => {
        setId(id);
        console.log("Peer js initialized", id);
        // emitting room id (from uuid) and peer id(from peer)
        socket?.emit("join_room", params.roomId, id);
      });
    })();
    isPeerSet.current = true;
  }, [ socket, params]);
  return { peer, id };
};

export default usePeer;
