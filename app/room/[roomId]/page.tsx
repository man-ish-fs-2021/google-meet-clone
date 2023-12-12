"use client";
import Player, { PlayerProps } from "@/components/Player";
import { useSocket } from "@/context";
import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./room.module.css";
import ControlPanel from "@/components/ControlPannel";
import { MediaConnection } from "peerjs";
import _ from "lodash";

const Room = () => {
  const params = useParams<{ roomId: string }>();
  const { stream } = useMediaStream();
  const socket = useSocket();
  const { peer, id } = usePeer();
  const [userCalls, setUserCalls] = useState<{ [id: string]: MediaConnection }>(
    {}
  );
  const {
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
    players
    // removePlayers
  } = usePlayer({
    id: id || "",
    roomId: params?.roomId || "",
    peer,
  });
  useEffect(() => {
    if (!socket || !stream || !peer || !setPlayers) return;
    const handleUserConnected = async (newUserId: string, myStream: MediaStream): Promise<void> => {
      console.log("user connect in room with user id", newUserId);
      const call = await peer?.call(newUserId, myStream);
      call?.on("stream", (incomingStream) => {
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
        setUserCalls((prev) => ({
          ...prev,
          [newUserId]: call,
        }));
      });
    };
    socket?.on("user_connected", (userId) => setTimeout(handleUserConnected,1000,userId,stream));
    return () => {
      socket?.off("user_connected", (userId) => setTimeout(handleUserConnected,1000,userId,stream));
    };
  }, [socket, peer, stream, setPlayers]);

  useEffect(() => {
    if (!peer || !stream || !setPlayers) return;
    peer.on("call", (call): void => {
      const { peer: callerId } = call;
      call.answer(stream || undefined);
      call.on("stream", (incomingStream) => {
        console.log(`I joined a room, incoming stream from ${callerId}`, {
          incomingStream,
        });
        setPlayers((prev) => ({
          ...prev,
          [callerId || ""]: {
            url: incomingStream,
            muted: false,
            playing: true,
            playerId: callerId,
          } as PlayerProps,
        }));
        setUserCalls((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !id || !setPlayers ) return;
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
  useEffect(() => {
    if (!socket || !userCalls || !setPlayers) return;
    const handleToggleAudio = (userId: string) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = _.cloneDeep(prev);
        if(userId in userCalls){

          copy[userId].muted = !copy[userId].muted;
          console.log(`audio ${copy[userId].muted ?'stopped' :'resumed' } for`, userId)
        }
  
        return { ...copy };
      });
    };
    socket?.on("user_toggle_audio", handleToggleAudio);
    const handleToggleVideo = (userId: string) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = _.cloneDeep(prev);
        if (userId in userCalls) copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };
    socket?.on("user_toggle_video", handleToggleVideo);
    const handleUserLeave = (userId: string) => {
      console.log("user with user id is leacing the room", userId);
      setPlayers((prev) => {
        const copy = _.cloneDeep(prev);
        delete copy[userId]
        return { ...copy };
      });
      userCalls[userId]?.close();
    };
    socket?.on("user_leave", handleUserLeave);
    return () => {
    socket?.off("user_leave", handleUserLeave);
    socket?.off("user_toggle_video", handleToggleVideo);
    socket?.off("user_toggle_audio", handleToggleAudio);

    }
  }, [socket, userCalls, setPlayers]);
  console.log({userCalls})
  return (
    <div className="w-full h-full bg-black">
      {playerHighlighted && (
        <div className={styles.activePlayerContainer}>
          <Player
            key={playerHighlighted.playerId}
            url={playerHighlighted.url || ""}
            muted={playerHighlighted.muted}
            playerId={playerHighlighted.playerId || ""}
            playing={playerHighlighted.playing}
          />
        </div>
      )}
      <div className={styles.inActivePlayerContainer}>
        {Object.keys(nonHighlightedPlayers).map((key: string) => {
          const info = nonHighlightedPlayers[key];
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
      {playerHighlighted && ( <ControlPanel
        muted={playerHighlighted.muted}
        playing={playerHighlighted.playing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        leaveRoom={leaveRoom}
      />)}
     
    </div>
  );
};

export default Room;
