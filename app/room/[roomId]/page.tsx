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
  const { peer ,id } = usePeer();
  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket.id);
    });
  }, [socket]);
  return <div><Player url={stream || ""} muted={true} playerId={id || ""} playing={true} /></div>;
};

export default Room;
