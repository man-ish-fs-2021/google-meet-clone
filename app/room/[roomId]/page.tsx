"use client";
import Player, { PlayerProps } from "@/components/Player";
import { useSocket } from "@/context";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Room = () => {
  const params = useParams<{ roomId: string }>();
  const { stream } = useMediaStream();
  const socket = useSocket();
  const { peer, id } = usePeer();
  const { players, setPlayers } = usePlayer();
  useEffect(() => {
    if (!socket || !stream || !peer || !setPlayers) return;
    const handleUserConnected = (newUserId: string) => {
      console.log("user connect in room with user id", newUserId);
      const call = peer?.call(newUserId, stream);
      call.on("stream", (incomingStream) => {
        console.log(
          `I am main User, incoming stream from new User ${newUserId}`,
          { incomingStream }
        );
        setPlayers((prev) => ({
          ...prev,
          [newUserId || ""]: {
            url: incomingStream,
            muted: false,
            playing: true,
            playerId: newUserId,
          } as PlayerProps,
        }));
      });
    };
    socket?.on("user_connected", handleUserConnected);
    return () => {
      socket?.off("user_connected", handleUserConnected);
    };
  }, [socket, peer, stream, setPlayers]);

  useEffect(() => {
    if (!peer || !stream || !setPlayers) return;
    peer.on("call", (call): void => {
      const { peer: callerId } = call;
      call.answer(stream || undefined);
      call.on("stream", (incomingStream) => {
        console.log(`I joined a room, incoming stream from ${callerId}`, { incomingStream });
        setPlayers((prev) => ({
          ...prev,
          [callerId || ""]: {
            url: incomingStream,
            muted: false,
            playing: true,
            playerId: callerId,
          } as PlayerProps,
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !id || !setPlayers) return;
    console.log(`setting my stream ${id}`);
    setPlayers((prev) => ({
      ...prev,
      [id || ""]: {
        url: stream,
        muted: false,
        playing: true,
        playerId: id,
      } as PlayerProps,
    }));
  }, [id, setPlayers, stream]);
  return (
    <div>
      {Object.keys(players).map((key: string) => {
        const info = players[key]
        return (
          <Player
            key={key}
            url={info.url || ""}
            muted={info.muted}
            playerId={key || ""}
            playing={info.playing}
          />
        );
      })}
    </div>
  );
};

export default Room;
