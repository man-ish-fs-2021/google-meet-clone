"use client";
import Player from "@/components/Player";
import { useSocket } from "@/context";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Room = () => {
  const params = useParams<{ roomId: string }>();
  const { stream } = useMediaStream();
  const socket = useSocket();
  const { peer, id } = usePeer();
  useEffect(() => {
    if (!socket || !stream || !peer) return;
    const handleUserConnected = (newUserId: string) => {
      console.log("user connect in room with user id", newUserId);
      const call = peer?.call(newUserId, stream)
      call.on('stream',  (incomingStream) => {
        console.log(`I am main User, incoming stream from new User ${newUserId}`, {incomingStream})
      })
    };
    socket?.on("user_connected", handleUserConnected);
    return () => {
      socket?.off("user_connected", handleUserConnected);
    };
  }, [socket, peer, stream]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on('call', (call): void => {
      const {peer: callerId} = call;
      call.answer(stream || undefined)
      call.on('stream',  (incomingStream) => {
        console.log(`incoming stream from ${callerId}`, {incomingStream})
      })
    })
  }, [peer, stream])
  return (
    <div>
      <Player
        url={stream || ""}
        muted={true}
        playerId={id || ""}
        playing={true}
      />
    </div>
  );
};

export default Room;
